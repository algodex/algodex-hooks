import {getMinWalletBalance} from '@algodex/algodex-sdk/lib/functions/base.js';
import {useQuery} from 'react-query';
// const refetchInterval = 3000;
// import withQuery from '@/util/withQuery';
// import Spinner from '@/components/Spinner';
// import ServiceError from '@/components/ServiceError';
//
// const components = {
//   Loading: Spinner,
//   ServiceError,
// };
/**
 * Use Wallet Minimum Balance Query
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export default function useWalletMinBalanceQuery({
  wallet,
  options = {
    enabled: typeof wallet !== 'undefined' &&
      typeof wallet.address !== 'undefined',
  },
}) {
  return useQuery(
      ['walletMinBalance', {address: wallet?.address}],
      async () => await getMinWalletBalance(wallet),
      options,
  );
}
