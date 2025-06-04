/// <reference types="svelte" />
export default function createDataStore(): {
    src: import("svelte/store").Writable<any>;
    alt: import("svelte/store").Writable<any>;
    caption: import("svelte/store").Writable<any>;
    byline: import("svelte/store").Writable<any>;
    manifests: import("svelte/store").Writable<any[]>;
    setSrc: (val: any) => void;
    setAlt: (val: any) => void;
    setCaption: (val: any) => void;
    setByline: (val: any) => void;
    setManifests: (val: any) => void;
};
