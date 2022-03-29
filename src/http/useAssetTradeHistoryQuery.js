import {useQuery} from 'react-query';
import {fetchAssetTradeHistory} from '@/services/algodex.js';
import {floatToFixed} from '@/services/display.js';

// const refetchInterval = 3000;
import withQuery from '@/util/withQuery';
import Spinner from '@/components/Spinner';
import ServiceError from '@/components/ServiceError';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 *
 * @param {JSX.Element} Component React Component
 * @param {object} [options] Extra options for hooks
 * @return {JSX.Element}
 */
export function withAssetTradeHistoryQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetTradeHistoryQuery,
    components,
    ...options,
  });
}

/**
 * Use Asset Trade History Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} Massaged React-Query
 */
export default function useAssetTradeHistoryQuery({
  asset,
  options = {
    refetchInterval: 5000,
    staleTime: 3000,
  },
}) {
  const {id} = asset;
  const {data, ...rest} = useQuery(
      ['assetTradeHistory', {id}],
      () => fetchAssetTradeHistory(id),
      options,
  );

  const tradesData =
    data?.transactions.map((txn) => ({
      id: txn.PK_trade_history_id,
      type: txn.tradeType,
      price: floatToFixed(txn.formattedPrice),
      amount: txn.formattedASAAmount,
      timestamp: txn.unix_time * 1000,
    })) || [];

  return {data: {orders: tradesData}, ...rest};
}