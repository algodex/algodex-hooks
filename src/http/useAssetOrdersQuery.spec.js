import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetOrdersQuery from './useAssetOrdersQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Asset Orders Only', () => {
  it('should fetch asset orders alone', async () => {
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/orders.php?assetId=${asset.id}`)
          .reply(200, require('./__tests__/fetchAssetOrders.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAssetOrdersQuery({asset}),
        {wrapper},
    );
    // console.log(result, 'result');
    await waitFor(() => {
      return result.current.isSuccess;
    });

    // TODO: Check the response parts not the entire object.
    // Break up into validation
    // expect(result.current.data).toEqual({
    //   'isLoading': false,
    //   'orders': {
    //     'buy': [],
    //     'sell': [
    //       {
    //         'amount': 1,
    //         'price': '1234.1235',
    //         'total': 1,
    //       },
    //     ],
    //   },
    // });
  });
});
