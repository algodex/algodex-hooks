/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';

import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withAssetTradeHistoryQuery,
} from './useAssetTradeHistoryQuery.js';

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
