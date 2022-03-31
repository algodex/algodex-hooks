import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetTradeHistoryQuery from './useAssetTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
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

    // TODO: Check the response parts not the entire object.
    // Break up into validation
    // expect(result.current.data).toEqual({
    //   isLoading: false,
    //   orders: {
    //     buy: [],
    //     sell: [
    //       {
    //         amount: 1,
    //         price: '1234.1235',
    //         total: 1,
    //       },
    //     ],
    //   },
    // });
  });
});
