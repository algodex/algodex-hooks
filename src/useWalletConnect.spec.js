/**
 * @jest-environment jsdom
 */
import {renderHook} from '@testing-library/react-hooks';
import {useWalletConnect} from './useWalletConnect.js';
import {wrapper} from '../test/setup.js';

describe('useWalletConnect', () => {
  it('should connect to wallet connect', () => {
    const {result} = renderHook(
        () => useWalletConnect(),
        {wrapper},
    );
    // TODO: test result of connect/disconnect
    expect(result.current.connect).toBeInstanceOf(Function);
  });
});
