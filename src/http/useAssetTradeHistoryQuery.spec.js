import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetTradeHistoryQuery from './useAssetTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Trade History', () => {
  it('should fetch asset trade history', async () => {
    // jest.setTimeout(60000);
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/trade_history.php?assetId=${asset.id}`)
          .reply(200, require('./__tests__/fetchAssetTradeHistory.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAssetTradeHistoryQuery({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    } );
    console.log(result.current, 'result')

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(
      ['orders'],
    );
  });
});
