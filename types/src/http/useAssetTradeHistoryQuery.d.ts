/**
 *
 * @param {JSX.Element} Component React Component
 * @param {object} [options] Extra options for hooks
 * @return {JSX.Element}
 */
export function withAssetTradeHistoryQuery(Component: JSX.Element, options?: object): JSX.Element;
/**
 * Use Asset Trade History Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} Massaged React-Query
 */
export function useAssetTradeHistoryQuery({ asset, options, }: {
    asset: any;
    options?: any;
}): object;
export default useAssetTradeHistoryQuery;
