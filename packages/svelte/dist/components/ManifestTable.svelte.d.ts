/** @typedef {typeof __propDef.props}  ManifestTableProps */
/** @typedef {typeof __propDef.events}  ManifestTableEvents */
/** @typedef {typeof __propDef.slots}  ManifestTableSlots */
export default class ManifestTable extends SvelteComponent<{
    manifest: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ManifestTableProps = typeof __propDef.props;
export type ManifestTableEvents = typeof __propDef.events;
export type ManifestTableSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        manifest: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
