/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAlgorandPriceQuery,
  withExplorerAssetInfo,
} from './useAlgoExplorer.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

describe('withAlgorandPriceQuery', ()=>{
  it('should compose withAlgorandPriceQuery', ()=>{
    expect(withAlgorandPriceQuery).toBeInstanceOf(Function);

    const Comp = withAlgorandPriceQuery(TestComponent);

    const {getByTestId} = render(
        <Comp/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
  it('should compose withExplorerAssetInfo', ()=>{
    expect(withExplorerAssetInfo).toBeInstanceOf(Function);

    const Comp = withExplorerAssetInfo(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
