/** @typedef {typeof __propDef.props}  ExplainerProps */
/** @typedef {typeof __propDef.events}  ExplainerEvents */
/** @typedef {typeof __propDef.slots}  ExplainerSlots */
export default class Explainer extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ExplainerProps = typeof __propDef.props;
export type ExplainerEvents = typeof __propDef.events;
export type ExplainerSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
