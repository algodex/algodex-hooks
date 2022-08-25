import {TestComponent, render} from '../../test/setup';

/**
 * @jest-environment jsdom
 */
import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withAssetPriceQuery,
} from './useAssetPriceQuery.js';

describe('withAssetPriceQuery', ()=>{
  it('should compose withAssetPriceQuery', ()=>{
    expect(withAssetPriceQuery).toBeInstanceOf(Function);

    const Comp = withAssetPriceQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
