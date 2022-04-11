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
          .get(`/orders.php?assetId=${asset.id}`)
          .reply(200, require('../../spec/fetchAssetOrders.json'));
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/charts2.php?assetId=${asset.id}&chartTime=${asset.interval}`)
          .reply(200, require('../../spec/fetchAssetChart.json'));
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
