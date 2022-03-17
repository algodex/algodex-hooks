import {
  useAlgorandPriceQuery,
  useExplorerAssetInfo,
} from '@/hooks/useAlgoExplorer';
import withQuery from '@/compose/withQuery';
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
