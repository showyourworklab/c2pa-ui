/// <reference types="svelte" />
export const locale: import("svelte/store").Writable<any>;
export const lang: import("svelte/store").Writable<any>;
export function setLocale(val: any): void;
export function getText(locale: any, ...keys: any[]): string;
declare namespace _default {
    export { locale };
    export { lang };
    export { setLocale };
    export { getText };
}
export default _default;
