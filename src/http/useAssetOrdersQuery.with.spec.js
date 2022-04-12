/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAssetOrdersQuery,
} from './useAssetOrdersQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

describe('withAssetOrdersQuery', ()=>{
  it('should compose withAssetOrdersQuery', ()=>{
    expect(withAssetOrdersQuery).toBeInstanceOf(Function);

    const Comp = withAssetOrdersQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
