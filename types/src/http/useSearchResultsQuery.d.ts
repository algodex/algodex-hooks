/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options] Options to pass to withQuery
 * @return {JSX.Element}
 */
export function withSearchResultsQuery(Component: JSX.Element | Function, options?: any): JSX.Element;
/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useSearchResultsQuery({ query, options, }?: {
    query: string;
    options?: any;
}): object;
export default useSearchResultsQuery;
