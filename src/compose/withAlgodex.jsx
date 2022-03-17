import {
  useAssetOrdersQuery,
  useAssetOrderbookQuery,
  useAssetPriceQuery,
  useAssetTradeHistoryQuery,
  useSearchResultsQuery,
  useAssetChartQuery,
  useWalletAssetsQuery,
  useWalletOrdersQuery,
  useWalletTradeHistoryQuery,
} from '@/hooks/useAlgodex';

import {withQuery} from '@/compose/withQuery';
import Spinner from '@/components/Spinner';
import ServiceError from '@/components/ServiceError';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options] Options to pass to withQuery
 * @return {JSX.Element}
 */
export function withSearchResultsQuery(Component, options) {
  return withQuery(Component, {
    hook: useSearchResultsQuery,
    components,
    ...options,
  });
}
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
 *
 * @param {JSX.Element} Component
 * @param {object} options
 * @return {JSX.Element}
 */
export function withAssetChartQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetChartQuery,
    components,
    ...options,
  });
}
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
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withAssetPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetPriceQuery,
    components,
    ...options,
  });
}
/**
 *
 * @param {JSX.Element} Component
 * @param {object} options
 * @return {JSX.Element}
 */
export function withWalletAssetsQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletAssetsQuery,
    components,
    ...options,
  });
}
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
