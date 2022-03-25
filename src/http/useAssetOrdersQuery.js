import {useQuery} from 'react-query';

// const refetchInterval = 3000;
import withQuery from '../util/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
import useAlgodex from '../useAlgodex.js';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 *
 * @todo add to PlaceOrder
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options]
 * @return {JSX.Element}
 */
export function withAssetOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrdersQuery,
    components,
    ...options,
  });
}

/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {UseQueryResult<Object, unknown>}
 */
export default function useAssetOrdersQuery({asset, options = {}}) {
  const {http: {dexd: {fetchAssetOrders}}} = useAlgodex();
  const {id} = asset;
  return useQuery(['assetOrders', {id}], () => fetchAssetOrders(id), options);
}
