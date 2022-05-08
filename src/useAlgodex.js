import {useContext} from 'react';
import {AlgodexContext} from './components/AlgodexContext.js';
import useWatch from './utils/useWatch.js';

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
export default function useAlgodex() {
  // Get AlgodexAPI Context
  const algodex = useContext(AlgodexContext);
  // Watch for key changes
  useWatch(algodex, ['config', 'addresses', 'wallet', 'asset']);

  const hasWallet = typeof algodex !== 'undefined' &&
    typeof algodex.wallet !== 'undefined' &&
    typeof algodex.wallet.address !== 'undefined';

  const hasAddresses = typeof algodex !== 'undefined' &&
    typeof algodex.addresses !== 'undefined' &&
    algodex.addresses.length > 0;

  const isConnected = hasWallet && hasAddresses;

  // Return algodex and Connect
  return {
    algodex,
    // connect,
    isConnected,
    http: algodex.http,
    wallet: algodex.wallet,
    setWallet: (...args)=>algodex.setWallet(...args),
    config: algodex.config,
    setConfig: (...args)=>algodex.setConfig(...args),
    placeOrder: (...args)=>algodex.placeOrder(...args),
  };
}
