import {useAlgorandPriceQuery, useExplorerAssetInfo} from './useAlgoExplorer.js';

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
          .reply(200, {
            'txid': 'VAU74RXRJQ5V3KX4YKSNAMUSOPS2BSZXGWOX5EMLXLLW4MC65YMA',
            'timestamp': 1644253464,
            'decimals': 10,
            'creator': 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
            'owner': null,
            'assetID': 69410904,
            'assetName': 'Zero',
            'unitName': 'ZERO',
            'url': 'https://phearzero.com',
            'defaultFrozen': false,
            'clawbackAccount': 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
            'freezeAccount': 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
            'reserveAccount': 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
            'managerAccount': 'TJFFNUYWHPPIYDE4DGGYPGHWKGAPJEWP3DGE5THZS3B2M2XIAPQ2WY3X4I',
            'totalSupply': 13370000000000,
            'txCount': 31,
            'circulatingSupply': 30012195344,
            'verified': false,
            'destroyed': false,
          });
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
    // expect(Object.keys(result.current.data)).toEqual([
    //   'sellASAOrdersInEscrow',
    //   'buyASAOrdersInEscrow',
    // ]);
  });
});

describe('Fetch Algorand Price Query', () => {
  it('should fetch asset orders alone', async () => {
    if (process.env.TEST_ENV !== 'integration') {
      nock(`https://price.algoexplorerapi.io/price/algo-usd`)
          .get()
          .reply(200, {
            'coin': 'ALGO-USD',
            'timestamp': 1649336804,
            'price': '0.7864',
            'best_bid': '0.7862',
            'best_ask': '0.7864',
            'open_24h': '0.7816',
            'low_24h': '0.7509',
            'high_24h': '0.8032',
          });
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
    expect(Object.keys(result.current.data)).toEqual([
      'sellASAOrdersInEscrow',
      'buyASAOrdersInEscrow',
    ]);
  });
});
