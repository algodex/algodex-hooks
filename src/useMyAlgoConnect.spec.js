import {renderHook} from '@testing-library/react-hooks';
import useMyAlgoConnect from './useMyAlgoConnect.js';
import {wrapper} from '../test/setup.js';

describe.skip('useMyAlgoConnect', () => {
  it('should test return value in useAlgodex hook', () => {
    const {result} = renderHook(
        () => useMyAlgoConnect(),
        {wrapper},
    );
    // TODO: test result of connect/disconnect
    expect(result.current).toBeInstanceOf(Function);
  });
});
