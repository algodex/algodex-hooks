import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import dayjs from 'dayjs';
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed';
import useAlgodex from '../useAlgodex.js';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import withQuery from '../utils/withQuery';
const refetchInterval = 3000;

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
export function withWalletOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletOrdersQuery,
    components,
    ...options,
  });
}
/**
 *
 * @param {object} data
 * @return {null|*[]}
 */
export function mapOpenOrdersData(data) {
  if (
    !data ||
    !data.buyASAOrdersInEscrow ||
    !data.sellASAOrdersInEscrow ||
    !data.allAssets
  ) {
    return null;
  }

  const {
    buyASAOrdersInEscrow: buyOrdersData,
    sellASAOrdersInEscrow: sellOrdersData,
    allAssets: assetsData,
  } = data;

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo;
    return allAssetsInfo;
  }, {});

  const buyOrders = buyOrdersData.map((order) => {
    const {assetId, formattedPrice, formattedASAAmount, unix_time} = order;
    return {
      asset: {id: assetId},
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      // date: moment(unix_time, 'YYYY-MM-DD HH:mm').format(),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order,
    };
  });

  const sellOrders = sellOrdersData.map((order) => {
    const {assetId, formattedPrice, formattedASAAmount, unix_time} = order;

    return {
      asset: {id: assetId},
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order,
    };
  });

  const allOrders = [...buyOrders, ...sellOrders];
  allOrders.sort((a, b) => (a.unix_time < b.unix_time ? 1 : -1));
  return allOrders;
}
/**
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export default function useWalletOrdersQuery({
  wallet,
  options = {refetchInterval},
}) {
  const {address} = wallet;
  const {http} = useAlgodex();
  const {data, ...rest} = useQuery(
      ['walletOrders', {address}],
      () => http.dexd.fetchWalletOrders(address),
      options,
  );
  const orders = useMemo(() => mapOpenOrdersData(data), [data]);
  return {data: {orders}, ...rest};
}
