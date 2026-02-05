export const classNames = (...arr) => arr.filter(c => c).map(c => `Syw-${c}`).join(' ')

export const handleA11yClick = (event, callback) => {
	if(event.key === 'Enter' || event.key === ' ') {
		event.preventDefault()
		if(callback) callback(event)
	}
}

export const getVerifyUrl = (src) => {
	// const imageUrl = `${window.location.origin}${src}`
	return `https://verify.contentauthenticity.org/inspect?source=${src}`
}

/**
 * Gets a localized date string from manifest entry's date
 * @function
 * @param {string} locale - Active locale
 * @param {object} data - Manifest entry
 * @return {string} - Localized date string
 */

/**
 * Get an object's value by a key using a case-insensitive match
 * @function
 * @param {string} key - String key of the desired value (case-insensitive)
 * @param {object} object - Any object
 * @returns {*} - Whatever the value is
 */
export const getObjectValue = (key, object) => {
	const safeKey = key && object
		? Object.keys(object).find((value, index) =>
			String(key).toLowerCase() === String(value).toLowerCase()
		) : null;
	return safeKey && object.hasOwnProperty(safeKey) ? (object)[safeKey] : null;
};