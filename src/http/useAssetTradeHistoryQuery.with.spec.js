/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAssetTradeHistoryQuery,
} from './useAssetTradeHistoryQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

describe('withAssetTradeHistoryQuery', ()=>{
  it('should compose withAssetTradeHistoryQuery', ()=>{
    expect(withAssetTradeHistoryQuery).toBeInstanceOf(Function);

    const Comp = withAssetTradeHistoryQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
