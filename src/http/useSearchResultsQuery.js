import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import useAlgodex from '../useAlgodex.js';
import {useQuery} from 'react-query';
import withQuery from '../utils/withQuery';

const refetchInterval = 3000;

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
  const {http} = useAlgodex()
  const {data, isError, error, ...rest} = useQuery(
      ['searchResults', {query}],
      () => http.dexd.searchAssets(query),
      options,
  );

  return {data, isError, error, ...rest};
}
