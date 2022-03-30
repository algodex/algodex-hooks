import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import useAlgodex from '../useAlgodex.js';
import {useQuery} from 'react-query';
import withQuery from '../utils/withQuery.js';
const refetchInterval = 3000;

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
  console.log(`useAssetOrdersQuery(${JSON.stringify({asset})})`);
  const {http} = useAlgodex();
  const {id} = asset;
  return useQuery(['assetOrders', {id}], () => http.dexd.fetchAssetOrders(id), options);
}
