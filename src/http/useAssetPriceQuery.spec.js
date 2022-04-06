import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useAssetPriceQuery from './useAssetPriceQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Asset Price', () => {
  it('should fetch asset price', async () => {
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/assets.php?id=${asset.id}`)
          .reply(200, require('./__tests__/fetchAssetPrice.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAssetPriceQuery({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['']);
  });
});
