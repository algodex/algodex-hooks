/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withAssetChartQuery,
} from './useAssetChartQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

describe('withAssetChartQuery', ()=>{
  it('should compose withAssetChartQuery', ()=>{
    expect(withAssetChartQuery).toBeInstanceOf(Function);

    const Comp = withAssetChartQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
