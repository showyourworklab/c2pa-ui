export default function createI18nStore(): {
    locale: import("svelte/store").Writable<any>;
    lang: import("svelte/store").Writable<any>;
    setLocale: (val: any) => void;
    getText: (locale: any, ...keys: any[]) => string;
};
