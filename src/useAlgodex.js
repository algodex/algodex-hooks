import {useContext} from 'react';
import AlgodexContext from './components/AlgodexContext.js';
// import useMyAlgo from './wallet/useMyAlgo.js';
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
  // console.log('useAlgodexAPI(', arguments[0], ')');
  // Get AlgodexAPI Context
  const algodex = useContext(AlgodexContext);
  // Watch for key changes
  useWatch(algodex, ['config', 'algod', 'addresses', 'wallet', 'asset']);

  // Check for state
  const isConnected =
    typeof algodex !== 'undefined' &&
    typeof algodex.addresses !== 'undefined' &&
    algodex.addresses.length > 0;

  // On MyAlgo Changes, update the AlgodexAPI
  // const handleMyAlgoChange = useCallback(
  //     (response) => {
  //       console.log(response);
  //       if (response == null) {
  //         return;
  //       }
  //       algodex.setAddresses(response);
  //     },
  //     [algodex],
  // );

  // Hook into MyAlgo
  // const connect = useMyAlgo({onChange: handleMyAlgoChange});

  // Return algodex and Connect
  return {
    algodex,
    // connect,
    isConnected,
    order: algodex.order,
    setOrder: algodex.setOrder,
    wallet: algodex.wallet,
    setWallet: algodex.setWallet,
    asset: algodex.asset,
    setAsset: algodex.setAsset,
    config: algodex.config,
    setConfig: algodex.setConfig,
    addresses: algodex.addresses,
    setAddresses: algodex.setAddresses,
    placeOrder: algodex.placeOrder,
    http: algodex.http,
  };
}
