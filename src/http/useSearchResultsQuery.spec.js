import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useSearchResultsQuery from './useSearchResultsQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Search Result', () => {
  it('should fetch search result', async () => {
    const asset = {
      query: 'hello',
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/asset_search.php?query=${asset.query}`)
          .reply(200, require('./__tests__/searchAssets.json'));
    }
    const {result, waitFor} = renderHook(
        () => useSearchResultsQuery(asset),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    } );
    
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['assets']);
  });
});
