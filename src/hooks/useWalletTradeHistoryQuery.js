import dayjs from 'dayjs';
import {floatToFixed} from '@/services/display.js';
import {useQuery} from 'react-query';
import {fetchWalletTradeHistory} from '@/services/algodex.js';
import {useMemo} from 'react';

const refetchInterval = 3000;

/**
 * Use Wallet Trade History
 *
 * @param {Object} props The props of the parent
 * @param {Object} props.wallet An instance of a Wallet
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useWalletTradeHistoryQuery({
  wallet,
  options = {
    refetchInterval,
  },
}) {
  const {address} = wallet;
  const mapTradeHistoryData = (data) => {
    const buyText = 'BUY';
    const sellText = 'SELL';
    if (!data || !data.transactions || !data.allAssets) {
      return null;
    }

    const {transactions: tradeHistoryData, allAssets: assetsData} = data;

    const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
      allAssetsInfo[currentAssetInfo.index] = currentAssetInfo;
      return allAssetsInfo;
    }, {});

    return tradeHistoryData.map(
        ({
          unix_time,
          asset_id,
          tradeType,
          formattedPrice,
          formattedASAAmount,
        }) => {
          const side = tradeType === 'buyASA' ? buyText : sellText;

          return {
            id: asset_id,
            date: dayjs(unix_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
            price: floatToFixed(formattedPrice),
            pair: `${assetsInfo[asset_id].params['unit-name']}/ALGO`,
            side,
            amount: formattedASAAmount,
          };
        },
    );
  };
  const {data, ...rest} = useQuery(
      ['walletTradeHistory', {address}],
      () => fetchWalletTradeHistory(address),
      options,
  );
  const orders = useMemo(() => mapTradeHistoryData(data), [data]);
  return {data: {orders}, ...rest};
}
