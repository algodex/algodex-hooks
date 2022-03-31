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
    const uri = `/orders.php?ownerAddr=${wallet.address}`+
      `&getAssetInfo=${wallet.includeAssetInfo}`;
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(uri)
          .reply(200, require('./__tests__/fetchWalletOrders.json'));
    }
    const {result, waitFor} = renderHook(
        () => useWalletOrdersQuery({wallet}),
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
