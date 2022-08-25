import {TestComponent, render} from '../../test/setup';

/**
 * @jest-environment jsdom
 */
import React from 'react';
import wallet from '../../spec/Wallet.json';
import {
  withWalletTradeHistoryQuery,
} from './useWalletTradeHistoryQuery.js';

describe.skip('withWalletTradeHistoryQuery', ()=>{
  it('should compose withWalletTradeHistoryQuery', ()=>{
    expect(withWalletTradeHistoryQuery).toBeInstanceOf(Function);

    const Comp = withWalletTradeHistoryQuery(TestComponent);

    const {getByTestId} = render(
        <Comp wallet={wallet}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
