import {renderHook} from '@testing-library/react-hooks';
import {
  useAssetChartQuery,
} from './useAssetChartQuery.js';
import {wrapper} from '../../test/setup.js';
import '../../test/nock';

import asset from '../../spec/Asset.json';
import chart from '../../spec/Chart.json';

describe('Fetch Asset Chart', () => {
  it('should fetch asset chart', async () => {
    const {result, waitFor} = renderHook(
        () => useAssetChartQuery({
          interval: chart.interval, asset,
        }),
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
