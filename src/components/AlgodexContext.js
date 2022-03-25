import React, {createContext, useMemo} from 'react';
import PropTypes from 'prop-types';
import AlgodexApi from '@algodex/algodex-sdk/lib/AlgodexApi';

/**
 * @typedef import('@algodex/algodex-sdk')
 */

/**
 *
 * @type {React.Context<{}>}
 */
const AlgodexAPIContext = createContext({});

/**
 *
 * @param {Object} props Component Properties
 * @param {AlgodexApi} props.dex The AlgodexAPI Instance
 * @param {JSX.Element} [props.children] Component Children
 * @return {JSX.Element}
 */
export function Provider({children, dex}) {
  const context = useMemo(() => dex, [dex]);
  return <AlgodexAPIContext.Provider value={context}>
    {children}
  </AlgodexAPIContext.Provider>;
}
Provider.propTypes = {
  /**
   * Children Components
   */
  children: PropTypes.node,
  /**
   * Instance of a AlgodexAPI
   */
  dex: PropTypes.instanceOf(AlgodexApi),
};
export default AlgodexAPIContext;
