/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {object}
 */
export function useExplorerAssetInfo({ asset, options }: object): object;
/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {*}
 */
export function withExplorerAssetInfo(Component: JSX.Element, options?: object): any;
/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {UseQueryResult<{assets: *}, unknown>}
 */
export function useAlgorandPriceQuery({ query, options, }?: {
    query: string;
    options?: any;
}): UseQueryResult<{
    assets: any;
}, unknown>;
/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] Options to pass to withQuery
 * @return {JSX.Element}
 */
export function withAlgorandPriceQuery(Component: JSX.Element | Function, options?: object): JSX.Element;
