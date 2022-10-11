/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withAssetOrderbookQuery(Component: JSX.Element, options?: object): JSX.Element;
/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export function useAssetOrderbookQuery({ asset, options, }?: {
    asset: any;
    options?: any;
}): object;
export default useAssetOrderbookQuery;
