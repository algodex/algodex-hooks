import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import {
  useAssetOrderbookQuery,
} from './useAssetOrderbookQuery.js';
import {wrapper} from '../../test/setup.js';

describe('useAssetOrderbookQuery', () => {
  it('should fail on invalid asset id', ()=>{
    const {result} = renderHook(() => useAssetOrderbookQuery(
        {asset: {}},
    ), {wrapper});
    expect(result.error.message).toEqual('Must have valid id!');
  });
  it('should fail on invalid decimals', ()=>{
    const {result} = renderHook(() => useAssetOrderbookQuery(
        {asset: {id: 123456}},
    ), {wrapper});
    expect(result.error.message).toEqual('Must have valid decimals!');
  });
  it('should fetch asset chart', async () => {
    const asset = {
      id: 69410904,
      decimals: 10,
    };
    if (process.env.TEST_ENV !== 'integration') {
      nock('https://testnet.algodex.com/algodex-backend')
          .get(`/orders.php?assetId=${asset.id}`)
          .reply(200, require('../../spec/fetchAssetOrders.json'));
    }
    const {result, waitFor} = renderHook(() => useAssetOrderbookQuery(
        {asset},
    ), {wrapper});

    await waitFor(() => {
      return result.current.isSuccess;
    });

    // TODO: Check the response parts not the entire object.
    // Break up into validation
    expect(result.current.data).toEqual({
      'isLoading': false,
      'orders': {
        'buy': [
          {
            'amount': 0.000404,
            'price': '1234.123450',
            'total': 0.000404,
          },
        ],
        'sell': [
          {
            'amount': 1,
            'price': '1234.123450',
            'total': 1,
          },
        ],
      },
    });
  });
});

