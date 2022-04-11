import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletOrdersQuery from './useWalletOrdersQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Wallet Orders', () => {
  it('should fetch orders in a wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
      includeAssetInfo: true,
    };
    const uri =
      `/orders.php?ownerAddr=${wallet.address}` +
      `&getAssetInfo=${wallet.includeAssetInfo}`;
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(uri)
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
