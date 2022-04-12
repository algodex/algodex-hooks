/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withWalletOrdersQuery,
} from './useWalletOrdersQuery.js';
import wallet from '../../spec/Wallet.json';
import {render, TestComponent} from '../../test/setup';

describe('withWalletOrdersQuery', ()=>{
  it('should compose withWalletOrdersQuery', ()=>{
    expect(withWalletOrdersQuery).toBeInstanceOf(Function);

    const Comp = withWalletOrdersQuery(TestComponent);

    const {getByTestId} = render(
        <Comp wallet={wallet}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
