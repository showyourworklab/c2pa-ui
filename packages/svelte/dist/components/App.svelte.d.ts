/** @typedef {typeof __propDef.props}  AppProps */
/** @typedef {typeof __propDef.events}  AppEvents */
/** @typedef {typeof __propDef.slots}  AppSlots */
export default class App extends SvelteComponent<{
    src?: string;
    alt?: string;
    caption?: string;
    byline?: string;
    locale?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type AppProps = typeof __propDef.props;
export type AppEvents = typeof __propDef.events;
export type AppSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        src?: string;
        alt?: string;
        caption?: string;
        byline?: string;
        locale?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
    exports?: {};
    bindings?: string;
};
export {};
