import '../../test/nock';

import {
  sortByASAPrice,
  sortPriceByTime,
  useAssetChartQuery,
} from './useAssetChartQuery.js';

import asset from '../../spec/Asset.json';
import chart from '../../spec/Chart.json';
import {renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../../test/setup.js';

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
  it('should sort by ASA Price', ()=>{
    const unsorted = [{asaPrice: 123}, {asaPrice: 12345}];
    expect(unsorted.sort(sortByASAPrice)).toEqual(
        [{asaPrice: 12345}, {asaPrice: 123}],
    );
  });
  it('should sort price by time', ()=>{
    const unsorted = [{time: 1234}, {time: 123}];
    expect(unsorted.sort(sortPriceByTime)).toEqual([
      {
        'time': 123,
      },
      {
        'time': 1234,
      },
    ]);
  });
});
