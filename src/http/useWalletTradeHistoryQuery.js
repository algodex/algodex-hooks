import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
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
export function withWalletTradeHistoryQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletTradeHistoryQuery,
    components,
    ...options,
  });
}

/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export default function useWalletTradeHistoryQuery({
  wallet,
  options = {
    refetchInterval,
  },
}) {
  const {address} = wallet;

  const {http} = useAlgodex();
  const {data, ...rest} = useQuery(
      ['walletTradeHistory', {address}],
      () => http.dexd.fetchWalletTradeHistory(address),
      options,
  );
  const orders = useMemo(() => http.dexd.mapTradeHistoryData(data), [data]);
  return {data: {orders}, ...rest};
}
