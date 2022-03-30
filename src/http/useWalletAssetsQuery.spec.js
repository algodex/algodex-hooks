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
          .reply(200, {
            'allAssets': [
              {
                'assetId': 19267953,
                'amount': 18,
                'asaInOrder': 0,
                'name': 'Kaafilatest',
                'unit_name': 'KFLT',
                'decimals': 0,
                'asaPrice': '470000.000000000000',
                'formattedTotalASAAmount': '18',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '18',
                'formattedPrice': '0.470000',
                'formattedTotalAlgoEquiv': '8.46',
              },
              {
                'assetId': 33698417,
                'amount': 719422,
                'asaInOrder': 0,
                'name': 'LudoCoin',
                'unit_name': 'L',
                'decimals': 6,
                'asaPrice': '1.020000087677',
                'formattedTotalASAAmount': '0.719422',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '0.719422',
                'formattedPrice': '1.020000',
                'formattedTotalAlgoEquiv': '0.73381',
              },
              {
                'assetId': 24270812,
                'amount': 3,
                'asaInOrder': 0,
                'name': 'ShitCoin',
                'unit_name': 'Shit',
                'decimals': 0,
                'asaPrice': '200000.000000000000',
                'formattedTotalASAAmount': '3',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '3',
                'formattedPrice': '0.200000',
                'formattedTotalAlgoEquiv': '0.6',
              },
              {
                'assetId': 21582668,
                'amount': 269867046,
                'asaInOrder': 0,
                'name': 'Tiny USDC',
                'unit_name': 'TINYUSDC',
                'decimals': 6,
                'asaPrice': '0.001349999971',
                'formattedTotalASAAmount': '269.867046',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '269.867046',
                'formattedPrice': '0.001350',
                'formattedTotalAlgoEquiv': '0.364321',
              },
              {
                'assetId': 70980802,
                'amount': 1,
                'asaInOrder': 0,
                'name': 'mynft4',
                'unit_name': 'mynft',
                'decimals': 0,
                'asaPrice': '9997000.000000000000',
                'formattedTotalASAAmount': '1',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '1',
                'formattedPrice': '9.997000',
                'formattedTotalAlgoEquiv': '9.997',
              },
              {
                'assetId': 62281549,
                'amount': 996500,
                'asaInOrder': 0,
                'name': 'xUSD',
                'unit_name': 'xUSD',
                'decimals': 6,
                'asaPrice': '1.000000000000',
                'formattedTotalASAAmount': '0.9965',
                'formattedASAInOrder': '0',
                'formattedASAAvailable': '0.9965',
                'formattedPrice': '1.000000',
                'formattedTotalAlgoEquiv': '0.9965',
              },
            ],
          });
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
