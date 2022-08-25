import '../../test/nock';

import {renderHook} from '@testing-library/react-hooks';
import useWalletTradeHistoryQuery from './useWalletTradeHistoryQuery.js';
import wallet from '../../spec/Wallet.json';
import {wrapper} from '../../test/setup.js';

describe.skip('useWalletTradeHistoryQuery', () => {
  it('should query trade history for a wallet', async () => {
    const {result, waitFor} = renderHook(
        () => useWalletTradeHistoryQuery({wallet}),
        {wrapper},
    );

    await waitFor(() => {
      return result.current.isSuccess;
    } );
    expect(result.current.isError).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(Object.keys(result.current.data)).toEqual(['orders']);
    expect(typeof result.current.data.orders).toBe('object');
  });
});
