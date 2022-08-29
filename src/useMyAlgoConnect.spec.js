/**
 * @jest-environment jsdom
 */
import {renderHook} from '@testing-library/react-hooks';
import useMyAlgoConnect from './useMyAlgoConnect.js';
import {wrapper} from '../test/setup.js';

describe('useMyAlgoConnect', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error');
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    // @ts-ignore jest.spyOn adds this functionallity
    console.error.mockRestore();
  });
  it('should connect to MyAlgoWallet', () => {
    const {result} = renderHook(
        () => useMyAlgoConnect(),
        {wrapper},
    );
    // TODO: test result of connect/disconnect
    expect(result.current).toBeInstanceOf(Object);
  });
});
