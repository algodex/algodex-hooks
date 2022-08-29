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
          .reply(200, require('../../spec/fetchAssetOrders.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAssetOrdersQuery({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    }, {interval: 1000});

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(Object.keys(result.current.data)).toEqual([
      'sellASAOrdersInEscrow',
      'buyASAOrdersInEscrow',
    ]);
  });
});
