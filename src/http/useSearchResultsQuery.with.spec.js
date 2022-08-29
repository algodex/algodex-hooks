/**
 * @jest-environment jsdom
 */
import {TestComponent, render} from '../../test/setup';

import React from 'react';
import asset from '../../spec/Asset.json';
import {
  withSearchResultsQuery,
} from './useSearchResultsQuery.js';

describe('withSearchResultsQuery', ()=>{
  it('should compose withSearchResultsQuery', ()=>{
    expect(withSearchResultsQuery).toBeInstanceOf(Function);

    const Comp = withSearchResultsQuery(TestComponent);

    const {getByTestId} = render(
        <Comp asset={asset}/>,
    );
    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
