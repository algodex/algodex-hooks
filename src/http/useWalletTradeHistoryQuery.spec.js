import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletTradeHistoryQuery from './useWalletTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';
import wallet from '../../spec/Wallet.json';
const INCLUDE_ASSET_INFO = true;

describe('Fetch Wallet Trade History', () => {
  it('should fetch trade history for the wallet', async () => {
    const uri = `/trade_history.php?ownerAddr=${wallet.address}`+
      `&getAssetInfo=${INCLUDE_ASSET_INFO}`;

    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(uri)
          .reply(
              200,
              require('../../spec/fetchWalletTradeHistory.json'),
          );
    }
    const {result, waitFor} = renderHook(
        () => useWalletTradeHistoryQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    } );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['orders']);
    expect(typeof result.current.data.orders).toBe('object');
  });
});
