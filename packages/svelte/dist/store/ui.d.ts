export default function createUiStore(): {
    isHoverImage: import("svelte/store").Writable<boolean>;
    isProvenanceOpen: import("svelte/store").Writable<boolean>;
    isExplainerOpen: import("svelte/store").Writable<boolean>;
    openManifests: import("svelte/store").Writable<{}>;
    eventHandler: import("svelte/store").Writable<any>;
    setEventHandler: (val: any) => void;
    hoverImage: (event: any) => void;
    unhoverImage: (event: any) => void;
    openProvenance: (event: any) => void;
    closeProvenance: (event: any) => void;
    openExplainer: (event: any) => void;
    closeExplainer: (event: any) => void;
    openManifest: (event: any, manifest: any) => void;
    closeManifest: (event: any, manifest: any) => void;
};
