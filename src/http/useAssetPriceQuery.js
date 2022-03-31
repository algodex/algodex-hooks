import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import {fetchAssetPrice} from '@/services/algodex.js';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import withQuery from '@/util/withQuery';

const refetchInterval = 3000;

const components = {
  Loading: Spinner,
  ServiceError,
};

/**
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @return {JSX.Element}
 */
export function withAssetPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetPriceQuery,
    components,
    ...options,
  });
}
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
