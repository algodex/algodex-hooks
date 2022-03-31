// import nock from 'nock';
import {renderHook} from '@testing-library/react-hooks';
import useWalletMinBalanceQuery from './useWalletMinBalanceQuery.js';
import {wrapper} from '../../test/setup.js';

describe('Fetch Wallet Minimum Balance', () => {
  it('should fetch minimum balance from wallet', async () => {
    const wallet = {
      address: 'ZXPEYJMWFLULILWJHWB3Y6DFI4ADE7XVMGARAH734ZJ5ECXAR4YVMRZ4EM',
      includesFullAccountInfo: true,
    };
    const {result, waitFor} = renderHook(
        () => useWalletMinBalanceQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    } );
    // expect(result.current.isError).toBe(false);
    // expect(result.current.isLoading).toBe(false);
    // expect(Object.keys(result.current.data)).toEqual(
    //     ['overlay', 'volume', 'ohlc', 'isLoading', 'isError'],
    // );
  });
});
