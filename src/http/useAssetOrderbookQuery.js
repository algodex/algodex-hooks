import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
const refetchInterval = 3000;
import withQuery from '../utils/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
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
export function withAssetOrderbookQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrderbookQuery,
    components,
    ...options,
  });
}

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export function useAssetOrderbookQuery({
  asset,
  options = {
    refetchInterval,
  },
} = {}) {
  // console.log(`useAssetOrderbookQuery(${JSON.stringify({asset})})`);
  const {http} = useAlgodex();
  const {id, decimals} = asset;
  const [sell, setSellOrders] = useState([]);
  const [buy, setBuyOrders] = useState([]);

  // Orderbook Query
  const {data, isLoading, ...rest} = useQuery(
      ['assetOrders', {id}],
      () => http.dexd.fetchAssetOrders(id),
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
          http.dexd.aggregateOrders(
              data.sellASAOrdersInEscrow, decimals, 'sell',
          ),
      );
      setBuyOrders(
          http.dexd.aggregateOrders(
              data.buyASAOrdersInEscrow, decimals, 'buy',
          ),
      );
    }
  }, [isLoading, data, setSellOrders, setBuyOrders, decimals]);

  // Return OrderBook
  return {data: {orders: {sell, buy}, isLoading}, isLoading, ...rest};
}

export default useAssetOrderbookQuery;
