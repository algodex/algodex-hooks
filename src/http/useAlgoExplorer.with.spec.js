/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';
import {
  withAlgorandPriceQuery,
  withExplorerAssetInfo,
} from './useAlgoExplorer.js';

import React from 'react';
import asset from '../../spec/Asset.json';

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
