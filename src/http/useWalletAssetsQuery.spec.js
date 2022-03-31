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
          .reply(200, require('./__tests__/fetchWalletAssets.json'));
    }
    const {result, waitFor} = renderHook(
        () => useWalletAssetsQuery({wallet}),
        {wrapper},
    );
    console.debug(result, 'result');
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
