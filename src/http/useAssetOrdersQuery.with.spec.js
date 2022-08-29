/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';

import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withAssetOrdersQuery,
} from './useAssetOrdersQuery.js';

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
