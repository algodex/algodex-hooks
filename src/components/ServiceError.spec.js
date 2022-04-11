/**
 * @jest-environment jsdom
 */
import React from 'react';
import {ServiceError} from './ServiceError';
import {render} from '../../test/setup';

const testProps = {
  flex: true,
  color: 'purple',
  size: 10,
  message: 'Something is up',
};

const tests = [
  {
    ...testProps,
  },
  {
    ...testProps,
    size: 1.5,
    flex: false,
  },
];
describe('Icon Button', () => {
  it('Should render flex container', () => {
    tests.map((props)=>{
      const {queryByTestId} = render(
          <ServiceError {...props} />,
      );

      if (props.flex) {
        expect(queryByTestId('flex-service')).not.toBeNull();
      } else {
        expect(queryByTestId('flex-service')).toBeNull();
      }
      if (props.size === 1.5) {
        expect(
            queryByTestId('mssg-service'),
        ).toHaveStyleRule('margin', '0 0 1rem 0');
      }

      expect(
          queryByTestId('mssg-service'),
      ).toHaveStyleRule('color', props.color);
    });
  });
});
