/** @typedef {typeof __propDef.props}  ManifestProps */
/** @typedef {typeof __propDef.events}  ManifestEvents */
/** @typedef {typeof __propDef.slots}  ManifestSlots */
export default class Manifest extends SvelteComponent<{
    index: any;
    manifest: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ManifestProps = typeof __propDef.props;
export type ManifestEvents = typeof __propDef.events;
export type ManifestSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        index: any;
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
