/*
 * Algodex Hooks
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {useMemo, useState} from 'react';
import {useQuery} from 'react-query';
const refetchInterval = 3000;
import withQuery from '../utils/withQuery';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';
import useAlgodex from '../useAlgodex.js';

const components = {
  Loading: Spinner,
  ServiceError,
};
/**
 *
 * @param {JSX.Element} Component
 * @param {object} [options]
 * @return {JSX.Element}
 */
export function withAssetOrderbookQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrderbookQuery,
    components,
    ...options,
  });
}

/**
 * Use Asset Orders Query
 * @param {Object} props The props of the parent
 * @param {Object} props.asset An instance of an Asset
 * @param {Object} [props.options] useQuery Options
 * @return {object} React Query Results
 */
export function useAssetOrderbookQuery({
  asset,
  options = {
    refetchInterval,
    notifyOnChangeProps: ['data', 'error'],
  },
} = {}) {
  // console.log(`useAssetOrderbookQuery(${JSON.stringify({asset})})`);
  const {http} = useAlgodex();
  const {id, decimals} = asset;
  if (typeof id === 'undefined') {
    throw new TypeError('Must have valid id!');
  }
  if (typeof decimals === 'undefined') {
    throw new TypeError('Must have valid decimals!');
  }

  // const [sell, setSellOrders] = useState([]);
  // const [buy, setBuyOrders] = useState([]);

  // Orderbook Query
  const {data, isLoading, ...rest} = useQuery(
      ['assetOrders', {id}],
      () => http.dexd.fetchAssetOrders(id),
      options,
  );

  // const etag = data?.etag || '';
  const [etag, setEtag] = useState('');
  const [returnData, setRetData] = useState({data:
    {orders: {sell: [], buy: []}, isLoading}, isLoading, ...rest});

  console.log('etag: ' + etag);

  useMemo(() => {
    if (data?.etag !== etag) {
      console.log('tsetting etag ' + etag + ' ' + data?.etag);
      setEtag(data?.etag || '');
    }
  }, [data, etag]);

  // Massage Orders
  useMemo(() => {
    console.log('inside useMemo due to data change');
    console.log('zetag: ' + etag);
    if (
      data &&
      !isLoading &&
      typeof data.sellASAOrdersInEscrow !== 'undefined' &&
      typeof data.buyASAOrdersInEscrow !== 'undefined'
    ) {
      const sell = http.dexd.aggregateOrders(
          data.sellASAOrdersInEscrow, decimals, 'sell',
      );
      const buy = http.dexd.aggregateOrders(
          data.buyASAOrdersInEscrow, decimals, 'buy',
      );
      setRetData({data: {orders: {sell, buy}, isLoading}, isLoading, ...rest});
    }
  }, [etag]);

  return returnData;
  // Return OrderBook
}

export default useAssetOrderbookQuery;
