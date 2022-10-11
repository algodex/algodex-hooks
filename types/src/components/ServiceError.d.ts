/**
 * Error Message
 *
 * @param {object} props Component Properties
 * @param {number} props.size <AlertIcon> Size
 * @param {string} props.color Component Color
 * @param {boolean} props.flex Enable Flex
 * @param {string} props.message Display Message
 * @param {JSXElement} props.Icon Icon Component to Render
 * @return {JSX.Element}
 * @constructor
 */
export function ServiceError({ size, color, flex, message, Icon }: {
    size: number;
    color: string;
    flex: boolean;
    message: string;
    Icon: JSXElement;
}): JSX.Element;
export class ServiceError {
    /**
     * Error Message
     *
     * @param {object} props Component Properties
     * @param {number} props.size <AlertIcon> Size
     * @param {string} props.color Component Color
     * @param {boolean} props.flex Enable Flex
     * @param {string} props.message Display Message
     * @param {JSXElement} props.Icon Icon Component to Render
     * @return {JSX.Element}
     * @constructor
     */
    constructor({ size, color, flex, message, Icon }: {
        size: number;
        color: string;
        flex: boolean;
        message: string;
        Icon: JSXElement;
    });
}
export namespace ServiceError {
    namespace propTypes {
        const size: any;
        const color: any;
        const message: any;
        const flex: any;
        const Icon: any;
    }
    namespace defaultProps {
        const size_1: number;
        export { size_1 as size };
        const color_1: string;
        export { color_1 as color };
        const flex_1: boolean;
        export { flex_1 as flex };
        const message_1: string;
        export { message_1 as message };
        export function Icon_1(props: any): JSX.Element;
        export { Icon_1 as Icon };
    }
}
export const FlexContainer: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: import("react").ElementType<any>;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export default ServiceError;
