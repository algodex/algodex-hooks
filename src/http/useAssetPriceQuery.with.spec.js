/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAssetPriceQuery,
} from './useAssetPriceQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

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
