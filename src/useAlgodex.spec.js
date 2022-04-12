import ValidationError from '@algodex/algodex-sdk/lib/Errors/ValidationError';
import {renderHook} from '@testing-library/react-hooks';
import useAlgodex from './useAlgodex.js';
import {wrapper} from '../test/setup.js';

describe('useAlgodex Hook', () => {
  it('should test return value in useAlgodex hook', async () => {
    const {result} = renderHook(
        () => useAlgodex(),
        {wrapper},
    );
    expect(Object.keys(result.current)).toEqual([
      'algodex', 'isConnected',
      'http', 'order',
      'setOrder', 'wallet',
      'setWallet', 'asset',
      'setAsset', 'config',
      'setConfig', 'addresses',
      'setAddresses', 'placeOrder',
    ]);

    expect(()=>result.current.setWallet({})).toThrowError(ValidationError);
    expect(()=>result.current.setAsset({})).toThrowError(ValidationError);
    expect(()=>result.current.setAddresses({})).toThrowError(ValidationError);
    result.current.setOrder({type: 'sell'});
    expect(result.current.algodex.order.type).toEqual('sell');
    expect(()=>result.current.setConfig({})).toThrowError(ValidationError);
    // expect(()=>result.current.placeOrder()).toThrowError(ValidationError);
  });
});
