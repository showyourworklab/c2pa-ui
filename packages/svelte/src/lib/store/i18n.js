import { get, writable } from 'svelte/store'
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'
import { getLocaleText, getLangFromLocale } from 'syw-common/helpers/i18n'

export default function createI18nStore() {
	const locale = writable(null)
	const lang = writable(null)
	const setLocale = val => {
		const newLocale = val ?? LOCALE_DEFAULT
		const newLang = getLangFromLocale(newLocale)
		locale.set(newLocale)
		lang.set(newLang)
	}
	const getText = (locale, ...keys) => {
		return getLocaleText(locale, ...keys)
	}

	return {
		locale,
		lang,
		setLocale,
		getText
	}
}