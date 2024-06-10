/** @typedef {typeof __propDef.props}  ProvenanceProps */
/** @typedef {typeof __propDef.events}  ProvenanceEvents */
/** @typedef {typeof __propDef.slots}  ProvenanceSlots */
export default class Provenance extends SvelteComponent<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ProvenanceProps = typeof __propDef.props;
export type ProvenanceEvents = typeof __propDef.events;
export type ProvenanceSlots = typeof __propDef.slots;
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
