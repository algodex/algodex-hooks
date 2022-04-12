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
 * @param {object} [options]
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
 * Use Wallet Orders Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletOrdersQuery({
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
  const orders = useMemo(() => http.dexd.mapOpenOrdersData(data), [data]);
  return {data: {orders}, ...rest};
}

export default useWalletOrdersQuery;
