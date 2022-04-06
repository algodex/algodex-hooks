import {useContext} from 'react';
import AlgodexContext from './components/AlgodexContext.js';
import fetchWallets from '@algodex/algodex-sdk/lib/wallet/http/fetchWallets';
// import useMyAlgo from './wallet/useMyAlgo.js';
import useWatch from './utils/useWatch.js';
import {useQuery} from 'react-query';

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
  useWatch(algodex, ['config', 'addresses', 'wallet', 'asset']);

  // Check for state
  const isConnected =
    typeof algodex !== 'undefined' &&
    typeof algodex.addresses !== 'undefined' &&
    algodex.addresses.length > 0;


  // TODO move to constructed instance of HTTPClient
  // TODO move to a proper useWalletsQuery
  const {data, isLoading, isError} = useQuery(
      'wallets',
      () => fetchWallets(algodex.config, algodex.addresses),
      {
        enabled: isConnected,
        refetchInterval: 3000,
      },
  );

  // Return algodex and Connect
  return {
    algodex,
    // connect,
    isConnected,
    http: algodex.http,
    order: algodex.order,
    setOrder: (...args)=>algodex.setOrder(...args),
    wallet: algodex.wallet,
    setWallet: (...args)=>algodex.setWallet(...args),
    asset: algodex.asset,
    setAsset: (...args)=>algodex.setAsset(...args),
    config: algodex.config,
    setConfig: (...args)=>algodex.setConfig(...args),
    addresses: isLoading || isError ? algodex.addresses : data,
    setAddresses: (...args)=>algodex.setAddresses(...args),
    placeOrder: (...args)=>algodex.placeOrder(...args),
  };
}
