/** @typedef {typeof __propDef.props}  ManifestTableRowProps */
/** @typedef {typeof __propDef.events}  ManifestTableRowEvents */
/** @typedef {typeof __propDef.slots}  ManifestTableRowSlots */
export default class ManifestTableRow extends SvelteComponent<{
    type: any;
    value: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ManifestTableRowProps = typeof __propDef.props;
export type ManifestTableRowEvents = typeof __propDef.events;
export type ManifestTableRowSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        type: any;
        value: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
