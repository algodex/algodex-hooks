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
