import {useQuery} from 'react-query';
import {searchAssets} from '@/services/algodex.js';

const refetchInterval = 3000;
import withQuery from '@/util/withQuery';
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
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export default function useSearchResultsQuery({
  query = '',
  options = {
    refetchInterval: query === '' ? refetchInterval : 20000,
  },
} = {}) {
  const {data, isError, error, ...rest} = useQuery(
      ['searchResults', {query}],
      () => searchAssets(query),
      options,
  );

  return {data, isError, error, ...rest};
}
