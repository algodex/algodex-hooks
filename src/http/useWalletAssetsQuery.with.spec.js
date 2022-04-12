/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withWalletAssetsQuery,
} from './useWalletAssetsQuery.js';
import wallet from '../../spec/Wallet.json';
import {render, TestComponent} from '../../test/setup';

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
