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
describe('Service Error', () => {
  tests.map((props)=>{
    it('should render flex contaienr', ()=>{
      const {queryByTestId} = render(
          <ServiceError {...props} />,
      );

      if (props.flex) {
        expect(queryByTestId('flex-service')).not.toBeNull();
        expect(
            queryByTestId('msg-flex'),
        ).toHaveStyleRule('margin', '0.375rem 0');
      } else {
        expect(queryByTestId('flex-service')).toBeNull();
        expect(
            queryByTestId('mssg-service'),
        ).toHaveStyleRule('color', props.color);
        expect(
            queryByTestId('mssg-service'),
        ).toHaveStyleRule('margin', '0 0 1rem 0');
      }
    });
  });
});
