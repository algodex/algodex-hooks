/**
 * @jest-environment jsdom
 */

import React from 'react';
import withQuery from './withQuery.js';
import {render} from '../../test/setup.js';
import {useQuery} from 'react-query';
import Spinner from '../components/Spinner';
import ServiceError from '../components/ServiceError';

describe('withQuery High Order Component', () => {
  it('should compose a component with a react-query', async () => {
    // eslint-disable-next-line require-jsdoc
    function MyComponent(props) {
      return (
        <div>MyComponent</div>
      );
    }
    // eslint-disable-next-line require-jsdoc
    function useTestHook() {
      return useQuery('testHook', ()=> {
        return {
          data: 'Data!',
        };
      });
    }
    try {
      withQuery(
          MyComponent,
          {
            hook: useTestHook,
          },
      );
    } catch (e) {
      expect(e.message).toEqual('Must have Loading and Error components');
    }
    try {
      withQuery(
          MyComponent,
          {
            hook: useTestHook,
            components: {
              ServiceError,
            },
          },
      );
    } catch (e) {
      expect(e.message).toEqual('Must have Loading and Error components');
    }

    const Comp = withQuery(
        MyComponent,
        {
          hook: useTestHook,
          components: {
            ServiceError, Loading: Spinner,
          },
        },
    );
    const {getByTestId} = render(
        <Comp/>,
    );

    expect(getByTestId('spinner-svg')).not.toBeNull();
  });
});
