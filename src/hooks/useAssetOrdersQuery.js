import {useQuery} from 'react-query';
import {fetchAssetOrders} from '@/services/algodex.js';

// const refetchInterval = 3000;

/**
 *
 * @param {object} asset
 * @param {object} options
 * @return {UseQueryResult<Object, unknown>}
 */
export default function useAssetOrdersQuery({asset, options = {}}) {
  // console.log(`useAssetOrdersQuery(${JSON.stringify({ asset })})`)
  const {id} = asset;
  return useQuery(['assetOrders', {id}], () => fetchAssetOrders(id), options);
}
