/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withWalletAssetsQuery(Component: JSX.Element, options?: object): JSX.Element;
/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @return {object}
 */
export function useWalletAssetsQuery({ wallet: { address }, options, }: {
    wallet: any;
    options?: any;
}): object;
export function mapAssetsData(data: object): null | any;
export default useWalletAssetsQuery;
