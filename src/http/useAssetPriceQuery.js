import ServiceError from '../components/ServiceError';
import Spinner from '../components/Spinner';
import useAlgodex from '../useAlgodex.js';
import {useMemo} from 'react';
import {useQuery} from 'react-query';
import withQuery from '../utils/withQuery';

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
export function useAssetPriceQuery({
  asset: algorandAsset,
  options = {
    refetchInterval,
  },
} = {}) {
  const {http} = useAlgodex();
  const {id} = algorandAsset;
  const formattedAssetPrice = (id) => {
    const {data} = http.dexd.fetchAssetPrice(id);
    if (data && typeof data !== 'undefined') {
      return http.dexd.fetchAssetPrice(id);
    }
    return () => {
      return {'ok': true, 'rows': 0, 'data': []};
    };
  };

  const {data: dexAsset, ...rest} = useQuery(
      ['assetPrice', {id}],
      () => formattedAssetPrice(id),
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

export default useAssetPriceQuery;
