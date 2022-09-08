import {AlgodexContext} from './components/AlgodexContext.js';
import {useContext} from 'react';

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

  // Check connection status
  const isConnected = typeof algodex !== 'undefined' &&
    typeof algodex.wallet !== 'undefined' &&
    typeof algodex.wallet.address !== 'undefined' &&
    typeof algodex.wallet.connector !== 'undefined' &&
    (algodex.wallet.connector._connected || algodex.wallet.connector.connected);

  // Return Algodex
  return {
    algodex,
    isConnected,
    http: algodex.http,
    wallet: algodex.wallet,
    setWallet: (...args)=>algodex.setWallet(...args),
    placeOrder: (...args)=>algodex.placeOrder(...args),
  };
}
