/** @typedef {typeof __propDef.props}  ManifestPreviewProps */
/** @typedef {typeof __propDef.events}  ManifestPreviewEvents */
/** @typedef {typeof __propDef.slots}  ManifestPreviewSlots */
export default class ManifestPreview extends SvelteComponent<{
    open: any;
    index: any;
    manifest: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ManifestPreviewProps = typeof __propDef.props;
export type ManifestPreviewEvents = typeof __propDef.events;
export type ManifestPreviewSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        open: any;
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
