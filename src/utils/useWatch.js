import {useState, useMemo} from 'react';

/**
 *
 * @param {Object} target
 * @param {string[]} keys
 * @return {object}
 */
function useWatch(target, keys) {
  // eslint-disable-next-line no-unused-vars
  const [__, updateChangeId] = useState(0);

  // useMemo to prevent unnecessary calls
  return useMemo(
      () => {
        const descriptor = keys.reduce((acc, key) => {
          const internalKey = `@@__${key}__`;

          acc[key] = {
            enumerable: true,
            configurable: true,
            get() {
              return target[internalKey];
            },
            set(value) {
              if (target[internalKey] !== value) {
                target[internalKey] = value;
                // <-- notify React about the change,
                updateChangeId((id) => id + 1);
              // the value's not important
              }
            },
          };
          return acc;
        }, {});

        return Object.defineProperties(target, descriptor);
      },

      [target, ...keys],
  );
}

export default useWatch;
