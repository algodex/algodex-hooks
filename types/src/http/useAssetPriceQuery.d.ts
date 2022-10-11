/**
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withAssetPriceQuery(Component: JSX.Element | Function, options?: object): JSX.Element;
/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */
export function useAssetPriceQuery({ asset: algorandAsset, options, }?: {
    asset: any;
    options?: any;
}): object;
export default useAssetPriceQuery;
