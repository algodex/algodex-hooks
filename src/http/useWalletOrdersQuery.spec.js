import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletOrdersQuery from './useWalletOrdersQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Wallet Orders', () => {
  it('should fetch orders in a wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
      includeAssetInfo: true
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/orders.php?ownerAddr=${wallet.address}&getAssetInfo=${wallet.includeAssetInfo}`)
          .reply(200, {
            "sellASAOrdersInEscrow": [],
            "buyASAOrdersInEscrow": [
              {
                "assetLimitPriceInAlgos": "470000.000000000000",
                "asaPrice": "470000.000000000000",
                "assetLimitPriceD": 470000,
                "assetLimitPriceN": 1,
                "algoAmount": 4225000,
                "asaAmount": 0,
                "assetId": 19267953,
                "appId": 22045503,
                "escrowAddress": "LJ3S6ORAHDULANESCNFPZLYOTP6OFIK5MVLK5SCCRQITQWVRODDAOWT3VU",
                "ownerAddress": "ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM",
                "version": 6,
                "minimumExecutionSizeInAlgo": 0,
                "round": 20662233,
                "unix_time": 1648637971,
                "formattedPrice": "0.470000",
                "formattedASAAmount": "9",
                "decimals": 0
              },
              {
                "assetLimitPriceInAlgos": "469000.000000000000",
                "asaPrice": "469000.000000000000",
                "assetLimitPriceD": 469000,
                "assetLimitPriceN": 1,
                "algoAmount": 3266000,
                "asaAmount": 0,
                "assetId": 19267953,
                "appId": 22045503,
                "escrowAddress": "OLFLPHAL3BJH2ONOHPATQBSMIXH6VL3PXTVIC2IS3IRQSW6MABVZUMD7HI",
                "ownerAddress": "ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM",
                "version": 6,
                "minimumExecutionSizeInAlgo": 0,
                "round": 20651446,
                "unix_time": 1648592257,
                "formattedPrice": "0.469000",
                "formattedASAAmount": "7",
                "decimals": 0
              }
            ],
            "allAssets": [
              {
                "created-at-round": 15364287,
                "deleted": false,
                "index": 19267953,
                "params": {
                  "clawback": "VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY",
                  "creator": "VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY",
                  "decimals": 0,
                  "default-frozen": false,
                  "freeze": "VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY",
                  "manager": "VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY",
                  "name": "Kaafilatest",
                  "name-b64": "S2FhZmlsYXRlc3Q=",
                  "reserve": "VMLNAI2UXWLF46GME6XW5LKEB4FGFR5E63PBS475LVDEUKPQ5ZGJIVHRUY",
                  "total": 100000000000,
                  "unit-name": "KFLT",
                  "unit-name-b64": "S0ZMVA==",
                  "url": "kaafila.org",
                  "url-b64": "a2FhZmlsYS5vcmc="
                }
              }
            ]
          });
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
