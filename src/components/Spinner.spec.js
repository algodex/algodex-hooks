/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render} from '../../test/setup';
import {Spinner} from './Spinner';

describe('Spinner', () => {
  it('should render a spinner', () => {
    const {queryByTestId} = render(
        <Spinner
          data-testid="spinner-element"
          color={'gray'}
          flex={true}
          size={5}
        />,
    );
    expect(queryByTestId('spinner-flex-container')).not.toBeNull();
    expect(queryByTestId('spinner-svg')).not.toBeNull();
  });
});
