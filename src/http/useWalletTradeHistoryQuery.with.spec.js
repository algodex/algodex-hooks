/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withWalletTradeHistoryQuery,
} from './useWalletTradeHistoryQuery.js';
import wallet from '../../spec/Wallet.json';
import {render, TestComponent} from '../../test/setup';

describe('withWalletTradeHistoryQuery', ()=>{
  it('should compose withWalletTradeHistoryQuery', ()=>{
    expect(withWalletTradeHistoryQuery).toBeInstanceOf(Function);

    const Comp = withWalletTradeHistoryQuery(TestComponent);

    const {getByTestId} = render(
        <Comp wallet={wallet}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
