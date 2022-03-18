import {useQuery} from 'react-query';
import WalletService from '@/services/wallet.js';

const refetchInterval = 3000;

/**
 * Use Wallets Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallets A list of Wallet Addresses
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletsQuery({
  wallets,
  options = {
    enabled: typeof wallets !== 'undefined',
    refetchInterval,
  },
}) {
  return useQuery(
      'wallets',
      () => WalletService.fetchWallets(wallets),
      options,
  );
}
