/**
 * @typedef {Object} AlgodexAPIHook
 * @property {AlgodexApi|boolean} algodex AlgodexAPI Instance or false
 * @property {boolean} isConnected Has connected wallets
 * @property {function} setWallet Set Wallets
 * @property {function} setAsset Set Asset
 * @property {function} setConfig Set AlgodexAPIConfig
 * @property {function} setAddresses Set Available Addresses
 * @property {((function(): Promise<void>)|*)} connect MyAlgo Connect
 */
/**
 * useAlgodexAPI
 *
 * Hooks for working with the algodex context. It constructs
 * an instance of AlgodexAPI
 *
 * @return {AlgodexAPIHook}
 */
export default function useAlgodex(): AlgodexAPIHook;
export type AlgodexAPIHook = {
    /**
     * AlgodexAPI Instance or false
     */
    algodex: AlgodexApi | boolean;
    /**
     * Has connected wallets
     */
    isConnected: boolean;
    /**
     * Set Wallets
     */
    setWallet: Function;
    /**
     * Set Asset
     */
    setAsset: Function;
    /**
     * Set AlgodexAPIConfig
     */
    setConfig: Function;
    /**
     * Set Available Addresses
     */
    setAddresses: Function;
    /**
     * MyAlgo Connect
     */
    connect: ((() => Promise<void>) | any);
};
