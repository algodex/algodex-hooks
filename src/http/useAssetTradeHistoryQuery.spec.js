import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetTradeHistoryQuery from './useAssetTradeHistoryQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
    // jest.setTimeout(60000);
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/trade_history.php?assetId=${asset.id}`)
          .reply(200, {
            "transactions": [
              {
                "PK_trade_history_id": 1392845,
                "transaction_id": null,
                "group_id": "PXTLsYYoIxGoVoKo6R5r+aRpTd2433ShfbOAy67RBc8=",
                "unix_time": 1647990996,
                "block_round": 20509420,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456463",
                "algoAmount": 521156,
                "asaAmount": 4221374781,
                "asaBuyerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "asaSellerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "tradeType": "sellASA",
                "formattedPrice": "1.234565",
                "formattedASAAmount": "0.4221374781"
              },
              {
                "PK_trade_history_id": 1392844,
                "transaction_id": null,
                "group_id": "lBcTYmyroTUk1gHRj2HGfxs785ODgpwLTKoj4RbsQsY=",
                "unix_time": 1647990996,
                "block_round": 20509420,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456452",
                "algoAmount": 497999,
                "asaAmount": 4033802944,
                "asaBuyerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "asaSellerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "tradeType": "sellASA",
                "formattedPrice": "1.234565",
                "formattedASAAmount": "0.4033802944"
              },
              {
                "PK_trade_history_id": 1392843,
                "transaction_id": null,
                "group_id": "fbphNLTsxJTT94VbShA0dUTk0eKgT0nkarBbwF4Pm04=",
                "unix_time": 1647990996,
                "block_round": 20509420,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456452",
                "algoAmount": 497999,
                "asaAmount": 4033802944,
                "asaBuyerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "asaSellerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "tradeType": "sellASA",
                "formattedPrice": "1.234565",
                "formattedASAAmount": "0.4033802944"
              },
              {
                "PK_trade_history_id": 1305228,
                "transaction_id": null,
                "group_id": "CEpx4rsRVS/7gAwbTiI09N/oQlZVxQKoV2/WcwT0H3g=",
                "unix_time": 1644860124,
                "block_round": 19769665,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000112345473",
                "algoAmount": 883982,
                "asaAmount": 7868425643,
                "asaBuyerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "sellASA",
                "formattedPrice": "1.123455",
                "formattedASAAmount": "0.7868425643"
              },
              {
                "PK_trade_history_id": 1305227,
                "transaction_id": null,
                "group_id": "dwuB+1uAzpPflYalL7847KZIHdqhiQcfuvUrzKlF+UE=",
                "unix_time": 1644860120,
                "block_round": 19769664,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000112345374",
                "algoAmount": 497999,
                "asaAmount": 4432750370,
                "asaBuyerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "sellASA",
                "formattedPrice": "1.123454",
                "formattedASAAmount": "0.4432750370"
              },
              {
                "PK_trade_history_id": 1305226,
                "transaction_id": null,
                "group_id": "2s7VFHfqtZet6yweb1rVRgAc+ankQ42r8MQgXirdOLI=",
                "unix_time": 1644860078,
                "block_round": 19769654,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456700",
                "algoAmount": 238567,
                "asaAmount": 1932394112,
                "asaBuyerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "sellASA",
                "formattedPrice": "1.234567",
                "formattedASAAmount": "0.1932394112"
              },
              {
                "PK_trade_history_id": 1305225,
                "transaction_id": null,
                "group_id": "zpELWmJpRu/p1orUJCqC19DHf1EPMF+QNu9yKBNlO8M=",
                "unix_time": 1644860078,
                "block_round": 19769654,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456452",
                "algoAmount": 497999,
                "asaAmount": 4033802944,
                "asaBuyerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "sellASA",
                "formattedPrice": "1.234565",
                "formattedASAAmount": "0.4033802944"
              },
              {
                "PK_trade_history_id": 1305224,
                "transaction_id": null,
                "group_id": "z+CzIcsM/VOyZe1FB2AlQxh1WZdVgJVNbASxJRGlTb4=",
                "unix_time": 1644860078,
                "block_round": 19769654,
                "application_id": 22045503,
                "asset_id": 69410904,
                "asaPrice": "0.000123456452",
                "algoAmount": 497999,
                "asaAmount": 4033802944,
                "asaBuyerAddress": "KTEPR4DJWQRAFLT7R35NGHBXY5T7ZWBDFKQHZKTHS72NGUZAZ2C5A36MOA",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "sellASA",
                "formattedPrice": "1.234565",
                "formattedASAAmount": "0.4033802944"
              },
              {
                "PK_trade_history_id": 1269169,
                "transaction_id": null,
                "group_id": "IxWqaalkHbwa449XKKrMllV3DRA0witmpKvIlBCYTpw=",
                "unix_time": 1644253633,
                "block_round": 19626512,
                "application_id": 22045522,
                "asset_id": 69410904,
                "asaPrice": "0.133700000000",
                "algoAmount": 17875690,
                "asaAmount": 133700000,
                "asaBuyerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "asaSellerAddress": "TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I",
                "tradeType": "buyASA",
                "formattedPrice": "1337.000000",
                "formattedASAAmount": "0.0133700000"
              }
            ]
          });
    }
    const {result, waitFor} = renderHook(
        () => useAssetTradeHistoryQuery({asset}),
        {wrapper},
    );
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