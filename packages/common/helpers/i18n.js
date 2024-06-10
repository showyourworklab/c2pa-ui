import {
	LANG_DEFAULT,
	LOCALE_DEFAULT,
	LOCALE_DEFAULTS,
	DICTIONARIES,
	DICTIONARY_DEFAULT,
} from '../constants/i18n'

/**
 * Gets the language code from a locale code
 * @param {string} locale - ISO locale code (i.e. en_US)
 * @return {string} lang - ISO language code (i.e. en)
 */
export const getLangFromLocale = (locale = LOCALE_DEFAULT) => {
	const lang = locale.split('_')[0]
	return lang
}

/**
 * Gets the default locale code from a language code
 * @param {string} lang - ISO language code (i.e. en)
 * @return {string} locale - ISO locale code (i.e. en_US)
 */
export const getDefaultLocaleFromLang = (lang = LANG_DEFAULT) => {
	const locale = LOCALE_DEFAULTS.hasOwnProperty(lang)
		? LOCALE_DEFAULTS[lang]
		: LOCALE_DEFAULTS[LANG_DEFAULT]
	return locale
}

/**
 * Gets the default locale code using the language code of another locale code
 * This can be used to find an alternative locale code in the same language when the given locale is not available
 * @param {string} locale - ISO locale code (i.e. en_ZA)
 * @return {string} defaultLocale - ISO locale code (i.e. en_US)
 */
export const getDefaultLocaleFromLocale = (locale = LOCALE_DEFAULT) => {
	const lang = getLangFromLocale(locale)
	const defaultLocale = getDefaultLocaleFromLang(lang)
	return defaultLocale
}

/**
 * Gets a locale code that exists in the dictionary
 * If passed locale is valid, it will be returned
 * If it doesn't exist, but another locale with that lang, that locale will be returned
 * Otherwise, the default locale will be returned
 * @param {string} locale - ISO locale code (i.e. en_US)
 * @return {string} locale - ISO locale code (i.e. en_US)
 */
export const getSafeLocale = (locale = LOCALE_DEFAULT) => {
	let safeLocale
	// Does this locale exist?
	if(DICTIONARIES.hasOwnProperty(locale)) {
		safeLocale = locale
	} else {
		// Does this locale's language have a default locale available?
		const defaultLocale = getDefaultLocaleFromLocale(locale)
		if(DICTIONARIES.hasOwnProperty(defaultLocale)) {
			safeLocale = defaultLocale
		} else {
			safeLocale = LOCALE_DEFAULT
		}
	}
	return safeLocale
}

/**
 * Gets the text dictionary for the given locale code
 * @param {string} locale - ISO locale code (i.e. en_US)
 * @return {object} dictionary - Dictionary of text strings for given locale
 */
export const getDictionary = (locale = LOCALE_DEFAULT) => {
	const safeLocale = getSafeLocale(locale)
	const dictionary = DICTIONARIES[safeLocale]
	return dictionary
}

/**
 * Parses a locale code for its language code
 * @param {...string} keys - An array spread of strings to be joined with underscores and used as a key in the dictionary (i.e. x, y, z becomes x_y_z)
 * @return {string} text - The string from the dictionary
 */
export const getLocaleText = (locale = LOCALE_DEFAULT, ...keys) => {
	const dictionary = getDictionary(locale)
	const text = dictionary[keys.join('_')]
	return text
}

/**
 * Gets a human-readable date string for a given locale
 * @param {string} locale - 
 * @param {string} date - 
 * @return {string} dateString - 
 */
export const getDateString = (locale = LOCALE_DEFAULT, date) => {
	const dateObj = date ? new Date(date) : null
	// console.log(locale, date)
	const isValidDate = dateObj instanceof Date && isFinite(dateObj.getTime())
	const dateString = isValidDate ?
		dateObj.toLocaleDateString(locale.replace('_', '-'), {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	: null
	return dateString
}