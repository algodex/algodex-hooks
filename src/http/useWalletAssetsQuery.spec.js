import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletAssetsQuery from './useWalletAssetsQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Wallet Assets', () => {
  it('should fetch assets in a wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/wallet_assets.php?ownerAddr=${wallet.address}`)
          .reply(200, require('../../spec/fetchWalletAssets.json'));
    }
    const {result, waitFor} = renderHook(
        () => useWalletAssetsQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['assets']);
    expect(Array.isArray(result.current.data.assets)).toBeTruthy();
  });
});
