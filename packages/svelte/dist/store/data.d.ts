/// <reference types="svelte" />
export const src: import("svelte/store").Writable<any>;
export const alt: import("svelte/store").Writable<any>;
export const caption: import("svelte/store").Writable<any>;
export const byline: import("svelte/store").Writable<any>;
export const manifests: import("svelte/store").Writable<any[]>;
export function setSrc(val: any): void;
export function setAlt(val: any): void;
export function setCaption(val: any): void;
export function setByline(val: any): void;
export function setManifests(val: any): void;
declare namespace _default {
    export { src };
    export { alt };
    export { caption };
    export { byline };
    export { manifests };
    export { setSrc };
    export { setAlt };
    export { setCaption };
    export { setByline };
    export { setManifests };
}
export default _default;
