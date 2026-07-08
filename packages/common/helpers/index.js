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
}

/**
 * Get media type of src
 * @function
 * @param {*} src - String of media source
 * @returns {string} - Returns "image" or "video"
 */
export const getMediaType = (src) => {
	// TODO: Needs less rudementary check
	if(!src) {
		return null
	}
	else if(src.endsWith("mp4")) {
		return "video"
	} else {
		return "image"
	}
}

/**
 * Get available tabs based on manifest
 * @function
 * @param {...string} keys - Array of string keys
 * @param {object} data - Manifest entry
 * @returns {...string} - Returns array of string keys
 */
export const getAvailableTabs = (keys, data) =>
	keys?.filter(key => {
		const value = getObjectValue(key, data)
		if(key === "actions") {
			return value?.length
		} else if(key === "location") {
			return !isNaN(value?.lat) && !isNaN(value?.lng)
		} else {
			return true
		}
	})

/**
 * Converts JUMBF URI to data URI for IMG src
 * @function
 * @param {object} reader - C2PA reader instance
 * @param {object} identifier - JUMBF URI string
 * @param {object} format - Image format
 * @return {string} - Image data URI
 */
export const convertJumbfToDataUri = async (reader, identifier, format) => {
	if (!reader || !identifier || !format) return null
	try {
		const bytes = await reader.resourceToBytes(identifier)
		if (bytes) {
			const blob = new Blob([bytes], { type: format })
			return URL.createObjectURL(blob)
		}
		return null
	} catch (error) {
		console.error('Failed to get thumbnail URL:', error)
		return null
	}
}