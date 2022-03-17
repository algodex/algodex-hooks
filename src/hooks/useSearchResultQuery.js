import {useQuery} from 'react-query';
import {searchAssets} from '@/services/algodex.js';

const refetchInterval = 3000;

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
