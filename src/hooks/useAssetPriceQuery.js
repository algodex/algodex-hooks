import {useQuery} from 'react-query';
import {fetchAssetPrice} from '@/services/algodex.js';
import {useMemo} from 'react';

const refetchInterval = 3000;

/**
 * Use Asset Price Query
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @todo: Consolidate with Search
 * @return {object} Massaged Query
 */
export default function useAssetPriceQuery({
  asset: algorandAsset,
  options = {
    refetchInterval,
  },
} = {}) {
  // console.log(`useAssetPriceQuery(`, arguments[0], `)`);
  const {id} = algorandAsset;
  const {data: dexAsset, ...rest} = useQuery(
      ['assetPrice', {id}],
      () => fetchAssetPrice(id),
      options,
  );
  const asset = useMemo(() => {
    return {
      ...algorandAsset,
      price_info: dexAsset,
    };
  }, [algorandAsset, dexAsset]);

  return {data: {asset}, ...rest};
}
