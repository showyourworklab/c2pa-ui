export function getLangFromLocale(locale?: string): string;
export function getDefaultLocaleFromLang(lang?: string): string;
export function getDefaultLocaleFromLocale(locale?: string): string;
export function getSafeLocale(locale?: string): string;
export function getDictionary(locale?: string): object;
export function getLocaleText(locale?: string, ...keys: string[]): string;
export function getDateString(locale: string, date: string): string;
