/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render} from '../../test/setup';
import {Spinner} from './Spinner';
const defaultProps = {
  'data-testid': 'spinner-element',
  'color': 'gray',
  'flex': true,
  'size': 5,
};
const tests = [
  defaultProps,
  {...defaultProps, flex: false},
];
describe('Spinner', () => {
  tests.forEach((props)=>{
    it(`should render a ${props.flex ? 'flex spinner': 'spinner'}`, () => {
      const {queryByTestId} = render(
          <Spinner {...props}/>,
      );
      if (props.flex) {
        expect(queryByTestId('spinner-flex-container')).not.toBeNull();
      } else {
        expect(queryByTestId('spinner-flex-container')).toBeNull();
      }

      expect(queryByTestId('spinner-svg')).not.toBeNull();
    });
  });
});
