/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';

import React from 'react';
import wallet from '../../spec/Wallet.json';
import {
  withWalletOrdersQuery,
} from './useWalletOrdersQuery.js';

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
