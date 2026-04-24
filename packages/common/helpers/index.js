/**
 * Joins keys together into a class name prefixed by namespace
 * @param  {...any} arr 
 * @returns 
 */
export const classNames = (...arr) => arr.filter(c => c).map(c => c.startsWith(`Syw-`) ? c : `Syw-${c}`).join(' ')

/**
 * Handles a11y "clicks" with focused enter or space presses
 * @param {*} event 
 * @param {*} callback 
 */
export const handleA11yClick = (event, callback) => {
	if(event.key === 'Enter' || event.key === ' ') {
		event.preventDefault()
		if(callback) callback(event)
	}
}

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

/**
 * 
 * @param {*} src - String of media source
 * @returns {string} - Returns "image" or "video"
 */
export const getMediaType = (src) => {
	// Needs less rudementary check
	if(src.endsWith("mp4")) {
		return "video"
	} else {
		return "image"
	}
}