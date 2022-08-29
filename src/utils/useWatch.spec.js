import {act, renderHook} from '@testing-library/react-hooks';

import useWatch from './useWatch.js';
import {wrapper} from '../../test/setup.js';

/**
 *
 * @constructor
 */
function MyClass() {
  this.test = 5;
}

MyClass.prototype.six = function() {
  this.test = 6;
};

describe('useWatch Hook', () => {
  it('should watch for key changes', async () => {
    const myClass = new MyClass();
    const {result} = renderHook(
        () => useWatch(myClass, ['test']),
        {wrapper},
    );
    expect(Object.keys(result.current)).toEqual([
      'test',
    ]);

    await act(()=>{
      myClass.six();
    });

    expect(Object.keys(result.current)).toEqual([
      'test',
      '@@__test__',
    ]);
  });
});
