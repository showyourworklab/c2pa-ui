/// <reference types="svelte" />
export const isHoverImage: import("svelte/store").Writable<boolean>;
export const isProvenanceOpen: import("svelte/store").Writable<boolean>;
export const isExplainerOpen: import("svelte/store").Writable<boolean>;
export const openManifests: import("svelte/store").Writable<{}>;
export const eventHandler: import("svelte/store").Writable<any>;
export function setEventHandler(val: any): void;
export function hoverImage(event: any): void;
export function unhoverImage(event: any): void;
export function openProvenance(event: any): void;
export function closeProvenance(event: any): void;
export function openExplainer(event: any): void;
export function closeExplainer(event: any): void;
export function openManifest(event: any, manifest: any): void;
export function closeManifest(event: any, manifest: any): void;
