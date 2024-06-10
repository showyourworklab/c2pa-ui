/** @typedef {typeof __propDef.props}  FigureProps */
/** @typedef {typeof __propDef.events}  FigureEvents */
/** @typedef {typeof __propDef.slots}  FigureSlots */
export default class Figure extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type FigureProps = typeof __propDef.props;
export type FigureEvents = typeof __propDef.events;
export type FigureSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
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
