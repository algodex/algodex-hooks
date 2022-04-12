/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAssetOrderbookQuery,
} from './useAssetOrderbookQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

describe('withAssetOrderbookQuery', ()=>{
  it('should compose withAssetOrderbookQuery', ()=>{
    expect(withAssetOrderbookQuery).toBeInstanceOf(Function);

    const Comp = withAssetOrderbookQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
