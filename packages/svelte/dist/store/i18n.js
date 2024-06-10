import { get, writable } from 'svelte/store'
import { LOCALE_DEFAULT } from '../../../../common/constants/i18n'
import { getLocaleText, getLangFromLocale } from '../../../../common/helpers/i18n'

export const locale = writable(null)
export const lang = writable(null)
export const setLocale = val => {
	const newLocale = val ?? LOCALE_DEFAULT
	const newLang = getLangFromLocale(newLocale)
	locale.set(newLocale)
	lang.set(newLang)
}
export const getText = (locale, ...keys) => {
	return getLocaleText(locale, ...keys)
}

// const getText = derived(locale, ($locale, set) => {
//   set(getText($locale)); // Call getText with current locale
// });

export default {
	locale,
	lang,
	setLocale,
	getText
}