import {useQuery} from 'react-query';
import {fetchWalletAssets} from '@/services/algodex.js';
import {useMemo} from 'react';

const refetchInterval = 3000;

/**
 * @deprecated
 * @param {object} data
 * @return {null|*}
 */
export const mapAssetsData = (data) => {
  if (!data || !data.allAssets || !data.allAssets.length) {
    return null;
  }

  const {allAssets: assetsData} = data;

  return assetsData.map(
      ({
        unit_name,
        name,
        formattedTotalASAAmount,
        formattedASAAvailable,
        formattedASAInOrder,
        formattedTotalAlgoEquiv,
        assetId,
      }) => {
        return {
          'unit': unit_name,
          'id': assetId,
          name,
          'total': formattedTotalASAAmount || '',
          'available': formattedASAAvailable || '',
          'in-order': formattedASAInOrder || '',
          'algo-value': formattedTotalAlgoEquiv || '',
        };
      },
  );
};
/**
 * Use Wallet Assets Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @todo: Fetch Wallet Assets from on-chain
 * @return {object}
 */
export default function useWalletAssetsQuery({
  wallet: {address},
  options = {
    enabled: typeof address !== 'undefined',
    refetchInterval,
  },
}) {
  const {data, ...rest} = useQuery(
      ['walletAssets', {address}],
      () => fetchWalletAssets(address),
      options,
  );
  const assets = useMemo(() => mapAssetsData(data), [data]);
  return {data: {assets}, ...rest};
}
