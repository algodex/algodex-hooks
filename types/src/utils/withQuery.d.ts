/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element} Component Component to wrap
 * @param {object} options Query Options
 * @param {function} options.hook Callable Hook
 * @param {object} options.components Hook Components
 * @return {JSX.Element} Return a composed component
 */
export default function withQuery(Component: JSX.Element, { hook, components }: {
    hook: Function;
    components: object;
}): JSX.Element;
