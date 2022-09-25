declare namespace _default {
    export const title: string;
    export { Component as component };
    export namespace argTypes {
        namespace color {
            const options: string[];
            namespace control {
                const type: string;
            }
        }
        namespace flex {
            const options_1: boolean[];
            export { options_1 as options };
            export namespace control_1 {
                const type_1: string;
                export { type_1 as type };
            }
            export { control_1 as control };
        }
        namespace size {
            export namespace control_2 {
                const type_2: string;
                export { type_2 as type };
                export const min: number;
                export const max: number;
            }
            export { control_2 as control };
        }
    }
    export const decorators: ((Story: any) => JSX.Element)[];
}
export default _default;
export const Error: any;
import { default as Component } from "./ServiceError";
