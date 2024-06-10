/** @typedef {typeof __propDef.props}  CollapseProps */
/** @typedef {typeof __propDef.events}  CollapseEvents */
/** @typedef {typeof __propDef.slots}  CollapseSlots */
export default class Collapse extends SvelteComponent<{
    open: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CollapseProps = typeof __propDef.props;
export type CollapseEvents = typeof __propDef.events;
export type CollapseSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        open: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: {};
    bindings?: string;
};
export {};
