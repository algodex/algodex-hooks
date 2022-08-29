/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';

import React from 'react';
import wallet from '../../spec/Wallet.json';
import {
  withWalletAssetsQuery,
} from './useWalletAssetsQuery.js';

describe('withWalletAssetsQuery', ()=>{
  it('should compose withWalletAssetsQuery', ()=>{
    expect(withWalletAssetsQuery).toBeInstanceOf(Function);

    const Comp = withWalletAssetsQuery(TestComponent);

    const {getByTestId} = render(
        <Comp wallet={wallet}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
