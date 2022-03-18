import {useQuery} from 'react-query';
import {
  fetchExplorerAssetInfo, fetchAlgorandPrice,
} from '@/services/algoexplorer';
const DEBUG = process.env.NEXT_PUBLIC_DEBUG || process.env.DEBUG || false;

const refetchInterval = 3000;
import withQuery from '@/util/withQuery';
import Spinner from '@/components/Spinner';
import ServiceError from '@/components/ServiceError';
const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] Options to pass to withQuery
 * @return {JSX.Element}
 */
export function withAlgorandPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAlgorandPriceQuery,
    components,
    ...options,
  });
}

/**
 *
 * @param {JSX.Element} Component
 * @param {object} options
 * @return {*}
 */
export function withExplorerAssetInfo(Component, options) {
  return withQuery(Component, {
    hook: useExplorerAssetInfo,
    components,
    ...options,
  });
}
/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {object}
 */
export const useExplorerAssetInfo = ({asset, options}) => {
  DEBUG && console.debug(`useExplorerAssetInfo`);
  // const router = useRouter();
  const {id} = asset;
  const {data, isError, error, ...rest} = useQuery(
      ['explorerAsset', id],
      () => fetchExplorerAssetInfo(id),
      options,
  );
  // console.log(data)
  // useEffect(() => {
  //   let mounted = true
  //   if (mounted) {
  //     routeQueryError({ isError, error, router })
  //   }
  //   return () => (mounted = false)
  // }, [router, data, isError, error])

  return {data, isError, error, ...rest};
};

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {UseQueryResult<{assets: *}, unknown>}
 */
export const useAlgorandPriceQuery = ({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000,
  },
} = {}) => useQuery(
    ['fetchAlgorandPrice', {query}],
    () => fetchAlgorandPrice(query),
    options,
);
