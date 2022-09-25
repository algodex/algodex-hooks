/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withWalletTradeHistoryQuery(Component: JSX.Element, options?: object): JSX.Element;
/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletTradeHistoryQuery({ wallet, options, }: {
    wallet: any;
    options?: any;
}): object;
export default useWalletTradeHistoryQuery;
