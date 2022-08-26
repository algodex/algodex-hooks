/**
 * @jest-environment jsdom
 */

import {TestComponent, render} from '../../test/setup';

import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withAssetOrderbookQuery,
} from './useAssetOrderbookQuery.js';

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
