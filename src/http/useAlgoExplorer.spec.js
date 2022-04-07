import {
  useAlgorandPriceQuery,
  useExplorerAssetInfo,
} from './useAlgoExplorer.js';

import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import {wrapper} from '../../test/setup.js';

describe('Fetch Explorer Asset', () => {
  it('should fetch asset orders alone', async () => {
    const asset = {
      id: 69410904,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algoexplorerapi.io')
          .get(`/v1/asset/${asset.id}/info`)
          .reply(200, require('./__tests__/fetchExplorerAssetInfo.json'));
    }
    const {result, waitFor} = renderHook(
        () => useExplorerAssetInfo({asset}),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    });
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(Object.keys(result.current.data)).toEqual(
        [
          'id', 'deleted',
          'txid', 'timestamp',
          'decimals', 'name',
          'txns', 'fullName',
          'circulating', 'verified',
          'url', 'total',
        ],
    );
  });
});

describe('Fetch Algorand Price Query', () => {
  it('should fetch algorand price', async () => {
    if (process.env.TEST_ENV !== 'integration') {
      nock(`https://price.algoexplorerapi.io`)
          .get(`/price/algo-usd`)
          .reply(200, require('./__tests__/fetchAlgorandPrice.json'));
    }
    const {result, waitFor} = renderHook(
        () => useAlgorandPriceQuery(),
        {wrapper},
    );
    await waitFor(() => {
      return result.current.isSuccess;
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(Object.keys(result.current.data)).toEqual(['algoPrice']);
    expect(typeof result.current.data.algoPrice).toBe('string');
  });
});
