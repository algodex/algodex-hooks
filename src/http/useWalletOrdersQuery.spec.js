import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletOrdersQuery from './useWalletOrdersQuery.js';
import {wrapper, toOwnerInfoRoute} from '../../test/setup.js';
import wallet from '../../spec/Wallet.json';
const INCLUDE_ASSET_INFO = true;

describe('Fetch Wallet Orders', () => {
  it('should fetch orders in a wallet', async () => {
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(
              toOwnerInfoRoute(
                  'orders',
                  {wallet, includeAssetInfo: INCLUDE_ASSET_INFO},
              ),
          )
          .reply(200, require('../../spec/fetchWalletOrders.json'));
    }
    const {result, waitFor} = renderHook(
        () => useWalletOrdersQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['orders']);
    expect(typeof result.current.data.orders).toBe('object');
  });
});
