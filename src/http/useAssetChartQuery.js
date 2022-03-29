import {useMemo} from 'react';
import {useQuery} from 'react-query';

import millify from 'millify';

import Big from 'big.js';

const refetchInterval = 3000;
import withQuery from '../utils/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
import useAssetOrdersQuery from './useAssetOrdersQuery';
import {floatToFixed} from '../services/display.js';
import useAlgodex from '../useAlgodex.js';

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 *
 * @param {JSX.Element} Component
 * @param {object} options
 * @return {JSX.Element}
 */
export function withAssetChartQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetChartQuery,
    components,
    ...options,
  });
}

/**
 *
 * @param {object} data
 * @return {array}
 */
export function mapPriceData(data) {
  const prices =
    data?.chart_data.map(
        ({
          formatted_open,
          formatted_high,
          formatted_low,
          formatted_close,
          unixTime,
        }) => {
          const time = parseInt(unixTime);
          return {
            time: time,
            open: floatToFixed(formatted_open),
            high: floatToFixed(formatted_high),
            low: floatToFixed(formatted_low),
            close: floatToFixed(formatted_close),
          };
        },
    ) || [];
  return prices.sort(
      (a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0),
  );
}

/**
 * {high: String, low: String, close: String, open: String}
 * @param {object} data
 * @return {object}
 */
export function getOhlc(data) {
  const lastPriceData = data?.chart_data[0];

  return lastPriceData ?
    {
      open: floatToFixed(lastPriceData.formatted_open),
      high: floatToFixed(lastPriceData.formatted_high),
      low: floatToFixed(lastPriceData.formatted_low),
      close: floatToFixed(lastPriceData.formatted_close),
    } :
    {};
}

/**
 *
 * @param {object} data
 * @param {string} volUpColor
 * @param {string} volDownColor
 * @return {array}
 */
export function mapVolumeData(data, volUpColor, volDownColor) {
  const mappedData = data?.chart_data?.map(({asaVolume, unixTime}) => {
    const time = parseInt(unixTime);
    return {
      time: time,
      value: asaVolume,
    };
  });
  const volumeColors = data?.chart_data.map(({open, close}) =>
    open > close ? volDownColor : volUpColor,
  );
  return mappedData?.map((md, i) => ({...md, color: volumeColors[i]})) || [];
}

/**
 * {ask: String, bid: String, spread: String}
 * @todo: Move to SDK
 * @param {object} orderBook
 * @return {object}
 */
export function getBidAskSpread(orderBook) {
  const {buyOrders, sellOrders} = orderBook;

  const bidPrice = buyOrders.sort(
      (a, b) => b.asaPrice - a.asaPrice,
  )?.[0]?.formattedPrice || 0;
  const askPrice = sellOrders.sort(
      (a, b) => a.asaPrice - b.asaPrice,
  )?.[0]?.formattedPrice || 0;

  const bid = floatToFixed(bidPrice);
  const ask = floatToFixed(askPrice);
  const spread = floatToFixed(new Big(ask).minus(bid).abs());

  return {bid, ask, spread};
}

/**
 * Use Asset Chart Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {string} props.interval Interval to aggregate chart by
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useAssetChartQuery({
  interval,
  asset,
  options = {
    refetchInterval,
  },
}) {
  const {http} = useAlgodex();
  const {dexd: {fetchAssetChart}} = http;
  // console.log(`useAssetChartQuery(${JSON.stringify({ interval, asset })})`)
  const {id} = asset;
  const {
    data: assetOrders,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useAssetOrdersQuery({asset});

  const VOLUME_UP_COLOR = '#2fb16c2c';
  const VOLUME_DOWN_COLOR = '#e53e3e2c';
  const orderBook = useMemo(
      () => ({
        buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
        sellOrders: assetOrders?.sellASAOrdersInEscrow || [],
      }),
      [assetOrders],
  );

  const {bid, ask, spread} = useMemo(
      () => getBidAskSpread(orderBook), [orderBook],
  );

  const {
    isLoading: isChartLoading,
    isError: isChartError,
    data,
    ...rest
  } = useQuery(
      ['assetChart', {id, interval}],
      () => fetchAssetChart(id, interval),
      options,
  );

  const priceData = useMemo(
      () => mapPriceData(data),
      [data],
  );
  const volumeData = useMemo(
      () => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR),
      [data],
  );
  const ohlcOverlay = useMemo(
      () => getOhlc(data),
      [data],
  );

  const volume = millify(
      data?.chart_data[data?.chart_data.length - 1]?.asaVolume || 0,
  );

  const isLoading = isOrdersLoading || isChartLoading;
  const isError = isOrdersError || isChartError;

  return {
    data: {
      overlay: {
        ohlc: ohlcOverlay,
        orderbook: {bid, ask, spread},
        volume,
      },
      volume: volumeData,
      ohlc: priceData,
      isLoading,
      isError,
    },
    isLoading,
    isError,
    ...rest,
  };
}