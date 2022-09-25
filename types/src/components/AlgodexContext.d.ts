/**
 *
 * @param {Object} props Component Properties
 * @param {AlgodexApi} props.dex The AlgodexAPI Instance
 * @param {JSX.Element} [props.children] Component Children
 * @return {JSX.Element}
 */
export function Provider({ children, dex }: {
    dex: AlgodexApi;
    children?: JSX.Element;
}): JSX.Element;
export namespace Provider {
    namespace propTypes {
        const children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        const dex: PropTypes.Requireable<any>;
    }
}
/**
 * @typedef import('@algodex/algodex-sdk')
 */
/**
 *
 * @type {React.Context<{}>}
 */
export const AlgodexContext: React.Context<{}>;
/**
 * ('@algodex/algodex-sdk')
 */
type _import = any;
export { _import as import };
import PropTypes from "prop-types";
import React from "react";
