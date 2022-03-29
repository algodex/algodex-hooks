import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import {useAssetChartQuery} from './useAssetChartQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
    // jest.setTimeout(60000);
    const asset = {
      id: 15322902,
      interval: '15m',
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/charts2.php?assetId=${asset.id}&chartTime=${asset.interval}`)
          .reply(200, {
            current_price: '299.900005959120',
            previous_trade_price: '299.900004074814',
            last_period_closing_price: '299.900000000000',
            asset_info: {
              asset: {
                'created-at-round': 13596306,
                'deleted': false,
                'index': 15322902,
                'params': {
                  'clawback':
                  'PBSSJ2W6FDXVRPT4L4FGHTX2IHY3VREI44SB7VJTVT75UT6ER3CTVD6B74',
                  'creator':
                  'PBSSJ2W6FDXVRPT4L4FGHTX2IHY3VREI44SB7VJTVT75UT6ER3CTVD6B74',
                  'decimals': 6,
                  'default-frozen': false,
                  'freeze':
                  'PBSSJ2W6FDXVRPT4L4FGHTX2IHY3VREI44SB7VJTVT75UT6ER3CTVD6B74',
                  'manager':
                  'PBSSJ2W6FDXVRPT4L4FGHTX2IHY3VREI44SB7VJTVT75UT6ER3CTVD6B74',
                  'name': 'Lamps',
                  'name-b64': 'TGFtcHM=',
                  'reserve':
                  'PBSSJ2W6FDXVRPT4L4FGHTX2IHY3VREI44SB7VJTVT75UT6ER3CTVD6B74',
                  'total': 100000000000,
                  'unit-name': 'LAMP',
                  'unit-name-b64': 'TEFNUA==',
                },
              },
            },
            chart_data: [
              {
                asaVolume: 0.092002,
                algoVolume: 27.591401,
                low: '299.900002687377',
                formatted_low: '299.900003',
                high: '299.900096193486',
                formatted_high: '299.900096',
                close: '299.900005959120',
                formatted_close: '299.900006',
                open: '299.900002687377',
                formatted_open: '299.900003',
                dateTime: '2022-03-29T17:15:00Z',
                unixTime: 1648574100,
                date: '2022-03-29',
              },
            ],
            spread_info: {
              max_bid: '1801.0000',
              min_sell: '299.0000',
              spread: -1502,
            },
          });
    }
    const {result, waitFor} = renderHook(
        () => useAssetChartQuery({interval: asset.interval, asset}),
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
