import {renderHook} from '@testing-library/react-hooks';
import useWalletOrdersQuery from './useWalletOrdersQuery.js';
import {wrapper, toOwnerInfoRoute, nock} from '../../test/setup.js';
import wallet from '../../spec/Wallet.json';
const INCLUDE_ASSET_INFO = true;

if (process.env.TEST_ENV !== 'integration') {
  nock()
      .get(
          toOwnerInfoRoute(
              'orders',
              {wallet, includeAssetInfo: INCLUDE_ASSET_INFO},
          ),
      )
      .reply(200, require('../../spec/fetchWalletOrders.json'));
}

describe('useWalletOrdersQuery', () => {
  it('should query orders for a wallet', async () => {
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
