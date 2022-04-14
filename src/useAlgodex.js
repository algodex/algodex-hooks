import {useContext, useEffect} from 'react';

import {AlgodexContext} from './components/AlgodexContext.js';
import {useQuery} from 'react-query';
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

  // TODO move to a proper useAllAccountsInfo
  const {data: _addresses, isSuccess: isAccountsSuccess} = useQuery(
      ['fetchAccounts', algodex.addresses?.map((w)=>w.address)],
      () => algodex.http.indexer.fetchAccounts(algodex.addresses),
      {
        enabled: hasAddresses,
        refetchInterval: 3000,
      },
  );
  const isConnected = hasWallet && hasAddresses && isAccountsSuccess;
  // Set the addresses when account info resolves
  useEffect(()=>{
    if (typeof _addresses !== 'undefined' && isAccountsSuccess) {
      // console.log('updateAddress from effects');
      algodex.setAddresses(_addresses, {validate: false, merge: true});
    }
  }, [_addresses]);

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
    addresses: algodex.addresses,
    setAddresses: (...args)=>algodex.setAddresses(...args),
    placeOrder: (...args)=>algodex.placeOrder(...args),
  };
}
