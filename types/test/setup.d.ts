/**
 *
 * @param {JSX.Element} children
 * @return {JSX.Element}
 */
export function wrapper({ children }: JSX.Element): JSX.Element;
export function TestComponent(props: any): JSX.Element;
export * from "@testing-library/react";
export { customRender as render };
declare function customRender(ui: any, options?: {}): import("@testing-library/react").RenderResult<typeof import("@testing-library/react/node_modules/@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
