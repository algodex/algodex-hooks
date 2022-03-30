import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import {useAssetChartQuery} from './useAssetChartQuery.js';
import {wrapper} from '../../test/setup.js';

const owner = 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I';
const escrow = 'UBIEX7AUCPE5JH2NCMAXTACGCXUE334O6EHERVVKZWKN2HK4UKFTZAQTQM';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
    // jest.setTimeout(60000);
    const asset = {
      id: 15322902,
      interval: '15m',
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

    await waitFor(() => {
      return result.current.isSuccess;
    } );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(
        ['overlay', 'volume', 'ohlc', 'isLoading', 'isError'],
    );
  });
});
