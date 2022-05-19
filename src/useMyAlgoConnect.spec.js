/**
 * @jest-environment jsdom
 */
import {renderHook} from '@testing-library/react-hooks';
import useMyAlgoConnect from './useMyAlgoConnect.js';
import {wrapper} from '../test/setup.js';

describe('useMyAlgoConnect', () => {
  it('should connect to MyAlgoWallet', () => {
    const {result} = renderHook(
        () => useMyAlgoConnect(),
        {wrapper},
    );
    // TODO: test result of connect/disconnect
    expect(result.current).toBeInstanceOf(Object);
  });
});
