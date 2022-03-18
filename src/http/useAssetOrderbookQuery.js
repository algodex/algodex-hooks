import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchAssetOrders} from '@/services/algodex.js';
import {floatToFixed} from '@/services/display.js';
import {calculateAsaBuyAmount} from '@/services/convert.js';

const refetchInterval = 3000;
import withQuery from '@/util/withQuery';
import Spinner from '@/components/Spinner';
import ServiceError from '@/components/ServiceError';

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
export function withAssetOrderbookQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrderbookQuery,
    components,
    ...options,
  });
}

/**
 * @todo aggregate Orders in the API
 * @param {object} orders
 * @param {number} asaDecimals
 * @param {string} type
 * @return {*}
 */
function aggregateOrders(orders, asaDecimals, type) {
  const isBuyOrder = type === 'buy';
  let total = 0;

  const sortOrdersToAggregate = (a, b) => {
    if (isBuyOrder) {
      return b.asaPrice - a.asaPrice;
    }
    return a.asaPrice - b.asaPrice;
  };

  const reduceAggregateData = (result, order) => {
    const price = floatToFixed(order.formattedPrice);

    const orderAmount = isBuyOrder ? order.algoAmount : order.asaAmount;

    const amount = isBuyOrder ?
      calculateAsaBuyAmount(price, orderAmount) :
      parseFloat(order.formattedASAAmount);

    total += amount;

    const index = result.findIndex((obj) => obj.price === price);

    if (index !== -1) {
      result[index].amount += amount;
      result[index].total += amount;
      return result;
    }

    result.push({
      price,
      amount,
      total,
    });
    return result;
  };

  const sortRowsByPrice = (a, b) => {
    return b.price - a.price;
  };

  return orders.sort(sortOrdersToAggregate)
      .reduce(reduceAggregateData, [])
      .sort(sortRowsByPrice);
}

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export default function useAssetOrderbookQuery({
  asset,
  options = {
    refetchInterval,
  },
} = {}) {
  // console.log(`useAssetOrderbookQuery(${JSON.stringify({ asset })})`)
  const {id, decimals} = asset;
  const [sell, setSellOrders] = useState([]);
  const [buy, setBuyOrders] = useState([]);

  // Orderbook Query
  const {data, isLoading, ...rest} = useQuery(
      ['assetOrders', {id}],
      () => fetchAssetOrders(id),
      options,
  );

  // Massage Orders
  useEffect(() => {
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      setSellOrders(
          aggregateOrders(data.sellASAOrdersInEscrow, decimals, 'sell'),
      );
      setBuyOrders(
          aggregateOrders(data.buyASAOrdersInEscrow, decimals, 'buy'),
      );
    }
  }, [isLoading, data, setSellOrders, setBuyOrders, decimals]);

  // Return OrderBook
  return {data: {orders: {sell, buy}, isLoading}, isLoading, ...rest};
}
