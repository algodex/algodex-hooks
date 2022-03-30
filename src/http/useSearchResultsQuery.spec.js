import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useSearchResultsQuery from './useSearchResultsQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Search Result', () => {
  it('should fetch search result', async () => {
    const asset = {
      query: "hello",
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/asset_search.php?query=${asset.query}`)
          .reply(200, [
            {
              "assetName": "Hello World",
              "unitName": "domain",
              "verified": false,
              "destroyed": false,
              "assetId": 51039421,
              "isTraded": false,
              "decimals": 0,
              "hasOrders": true,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "10.999000"
            },
            {
              "assetName": "hello",
              "unitName": "hell",
              "verified": false,
              "destroyed": false,
              "assetId": 21158103,
              "isTraded": false,
              "decimals": 0,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HELLO",
              "unitName": "HJL",
              "verified": false,
              "destroyed": false,
              "assetId": 15148152,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HJL",
              "unitName": "HELLO",
              "verified": false,
              "destroyed": false,
              "assetId": 15147943,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HJL",
              "unitName": "HELLO",
              "verified": false,
              "destroyed": false,
              "assetId": 15147920,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HELLO",
              "unitName": "HJL",
              "verified": false,
              "destroyed": false,
              "assetId": 15147910,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HELLO",
              "unitName": "HJL",
              "verified": false,
              "destroyed": false,
              "assetId": 15147882,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            },
            {
              "assetName": "HELLO",
              "unitName": "HLO",
              "verified": false,
              "destroyed": false,
              "assetId": 15147851,
              "isTraded": false,
              "hasOrders": false,
              "formattedASALiquidity": "0",
              "formattedAlgoLiquidity": "0.000000"
            }
          ]);
    }
    const {result, waitFor} = renderHook(
        () => useSearchResultsQuery(asset),
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
