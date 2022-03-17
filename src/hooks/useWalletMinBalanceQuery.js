import {useQuery} from 'react-query';
import WalletService from '@/services/wallet.js';

// const refetchInterval = 3000;

/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletMinBalanceQuery({
  wallet,
  options = {
    enabled: typeof wallet !== 'undefined' &&
      typeof wallet.address !== 'undefined',
  },
}) {
  return useQuery(
      ['walletMinBalance', {address: wallet?.address}],
      async () => await WalletService.getMinWalletBalance(wallet),
      options,
  );
}
