/**
 *
 * @todo add to PlaceOrder
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options]
 * @return {JSX.Element}
 */
export function withAssetOrdersQuery(Component: JSX.Element | Function, options?: any): JSX.Element;
/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {UseQueryResult<Object, unknown>}
 */
export function useAssetOrdersQuery({ asset, options }: object): UseQueryResult<any, unknown>;
export default useAssetOrdersQuery;
