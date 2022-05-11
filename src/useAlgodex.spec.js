import ValidationError from '@algodex/algodex-sdk/lib/error/ValidationError';
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
      'http', 'wallet', 'setWallet',
      'placeOrder',
    ]);

    expect(()=>result.current.setWallet({})).toThrowError(ValidationError);
    // expect(()=>result.current.placeOrder()).toThrowError(ValidationError);
  });
});
