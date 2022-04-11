/**
 * @jest-environment jsdom
 */
import React from 'react';
import {ServiceError} from './ServiceError';
import {matchers} from '@emotion/jest';
import {render} from '../../test/setup';

expect.extend(matchers);

describe('Icon Button', () => {
  it('Should render flex container', () => {
    const TestIcon = ()=>(<div>Icon</div>);
    const {queryByTestId} = render(
        <ServiceError
          flex={true}
          size={10}
          message={'Something is up'}
          Icon={TestIcon}/>,
    );
    expect(queryByTestId('flex-service')).not.toBeNull();
    expect(queryByTestId('mssg-service')).toBeNull();
  });

  it('Should render message section', () => {
    const {queryByTestId} = render(
        <ServiceError flex={false} size={10} message={'Something is up'} />,
    );
    expect(queryByTestId('mssg-service')).not.toBeNull();
    expect(queryByTestId('flex-service')).toBeNull();
  });

  it('Should render component with appropriate component props', () => {
    const {queryByTestId} = render(
        <ServiceError
          size={1.5}
          flex={false}
          color="purple"
          message={'Something is up'}
        />,
    );
    expect(
        queryByTestId('mssg-service'),
    ).toHaveStyleRule('color', 'purple');
    expect(
        queryByTestId('mssg-service'),
    ).toHaveStyleRule('margin', '0 0 1rem 0');
  });

  it('Should render component with when color props is less than 300', () => {
    const {queryByTestId} = render(
        <ServiceError
          size={1.5}
          flex={false}
          color="gray"
          message={'Something is up'}
        />,
    );
    expect(
        queryByTestId('mssg-service'),
    ).toHaveStyleRule('color', 'gray');
  });
});
