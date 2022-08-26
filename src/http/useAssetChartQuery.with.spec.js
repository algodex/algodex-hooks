import {TestComponent, render} from '../../test/setup';

/**
 * @jest-environment jsdom
 */
import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withAssetChartQuery,
} from './useAssetChartQuery.js';

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
