/**
 * Loading Spinner
 *
 * Used to show a loading screen for asynchronous operations
 *
 * @param {object} props Component Properties
 * @param {number} props.size SVG Size
 * @param {string} props.color SVG Color
 * @param {boolean} props.flex Enable Flex
 * @return {JSX.Element}
 *
 * @todo Refactor to Tailwinds class="spinner"
 * @constructor
 */
export function Spinner({ size, color, flex, ...rest }: {
    size: number;
    color: string;
    flex: boolean;
}): JSX.Element;
export class Spinner {
    /**
     * Loading Spinner
     *
     * Used to show a loading screen for asynchronous operations
     *
     * @param {object} props Component Properties
     * @param {number} props.size SVG Size
     * @param {string} props.color SVG Color
     * @param {boolean} props.flex Enable Flex
     * @return {JSX.Element}
     *
     * @todo Refactor to Tailwinds class="spinner"
     * @constructor
     */
    constructor({ size, color, flex, ...rest }: {
        size: number;
        color: string;
        flex: boolean;
    });
}
export namespace Spinner {
    namespace propTypes {
        const size: any;
        const color: any;
        const flex: any;
    }
    namespace defaultProps {
        const size_1: number;
        export { size_1 as size };
        const color_1: string;
        export { color_1 as color };
        const flex_1: boolean;
        export { flex_1 as flex };
    }
}
export default Spinner;
