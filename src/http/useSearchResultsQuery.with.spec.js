/**
 * @jest-environment jsdom
 */
import React from 'react';
import {
  withSearchResultsQuery,
} from './useSearchResultsQuery.js';
import asset from '../../spec/Asset.json';
import {render, TestComponent} from '../../test/setup';

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
