import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetOrdersQuery from './useAssetOrdersQuery.js';
import {wrapper} from '../../test/setup.js';

const owner = 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I';
const escrow = 'UBIEX7AUCPE5JH2NCMAXTACGCXUE334O6EHERVVKZWKN2HK4UKFTZAQTQM';

describe('Fetch Asset Orders Only', () => {
  it('should fetch asset orders alone', async () => {
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/orders.php?assetId=${asset.id}`)
          .reply(200, {
            'sellASAOrdersInEscrow': [
              {
                'assetLimitPriceInAlgos': '0.123412345000',
                'asaPrice': '0.123412345000',
                'assetLimitPriceD': 1234123456,
                'assetLimitPriceN': 10000000000,
                'algoAmount': 498000,
                'asaAmount': 10000000000,
                'assetId': 69410904,
                'appId': 22045522,
                'escrowAddress': escrow,
                'ownerAddress': owner,
                'version': 7,
                'minimumExecutionSizeInAlgo': 0,
                'round': 19788126,
                'unix_time': 1644938291,
                'formattedPrice': '1234.123450',
                'formattedASAAmount': '1.0000000000',
                'decimals': 10,
              },
            ],
            'buyASAOrdersInEscrow': [

            ],
          });
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
