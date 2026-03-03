import { getSafeLocale } from './i18n.js'
import { VERIFY_BASE_URL } from '../constants/index.js'
import { C2PA_WEB_WASM_CDN_URL } from '../constants/c2pa.js'

/////////////// Initialize //////////////

/**
 * Creates C2PA instance configuration
 * @param {object} options - Optional overrides
 * @param {string} options.wasmSrc - Custom WASM source URL
 * @return {object} - C2PA configuration object
 */
export const getC2paConfig = (options = {}) => ({
    wasmSrc: options.wasmSrc || C2PA_WEB_WASM_CDN_URL,
})

/**
 * Reads C2PA data from an image source
 * @async
 * @param {object} c2pa - C2PA instance
 * @param {string} src - Image URL
 * @return {Promise<{manifestStore: object, reader: object}>} - Manifest store and reader
 */
export const readC2paFromUrl = async (c2pa, src) => {
    const response = await fetch(src)
    const blob = await response.blob()
    const reader = await c2pa.reader.fromBlob(blob.type, blob)
    const manifestStore = await reader.manifestStore()
    return { manifestStore, reader }
}

/////////////// Utilities ///////////////

/**
 * Gets an EXIF value from manifest
 * @function
 * @param {object} data - Manifest entry
 * @param {string} key - EXIF value key
 * @return {string} - EXIF value
 */
export const getExifValue = (data, key) => {
	const exifData = data?.assertions?.find(a => a.label === 'stds.exif')?.data
	// console.log(JSON.stringify(exifData))
	const exifValue = exifData && exifData[`exif:${key}`]
	return exifValue;
}

/**
 * Gets a schema.org value from manifest
 * @function
 * @param {object} data - Manifest entry
 * @param {string} key - Schema.org value key
 * @return {string} - Schema.org value
 */
export const getSchemaOrgValue = (data, key) => {
	const schema = data?.assertions?.find(a => a.label.includes('stds.schema-org'))?.data
	const schemaValue = schema && schema[key]
	return schemaValue
}

/**
 * Gets a C2PA action value from manifest
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Schema.org value
 */
export const getC2paActions = (data) => {
	const actions = data?.assertions?.find(a => a.label.includes('c2pa.actions'))?.data?.actions
	return actions
}

/**
 * Converts degrees minutes seconds (DMS) to decimal degrees (DD)
 * @function
 * @param {string} dms - Degrees minutes seconds (DMS)
 * @param {string} dir - Cardinal direction
 * @return {string} - Decimal degrees
 */
const convertDmsToDd = (dms, dir) => {
	if(!dms || !dir) return
    const dmsParts = dms?.split(" ")
    const degrees = parseFloat(dmsParts[0])
    const minutes = parseFloat(dmsParts[1])
    const seconds = parseFloat(dmsParts[2])
    let decimalDegrees = degrees + (minutes / 60) + (seconds / 3600)
    if (dir == "S" || dir == "W") {
        decimalDegrees = decimalDegrees * -1
    }
    return decimalDegrees
}

/////////////// Manifest Creation ///////////////

/**
 * Gets instance ID
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Instance ID
 */
export const getId = data => data?.instance_id

/**
 * Gets producer name
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Producer name
 */
export const getProducer = data => {
	const authorObj = getSchemaOrgValue(data, 'author')
	return authorObj ?? []
}

/**
 * Gets a description of claim generator
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - List of generator names with version (i.e. Lightroom Classic 14.0)
 */
export const getGenerator = data => {
	let generator = {}
	if(data?.claim_generator_info) {
		generator.value = data?.claim_generator_info?.map(d =>
			[d.name, d.version]
				.filter(d => d !== null && d !== undefined)
				.join(" ")
		).join(", ")
	} else if(getExifValue(data, 'Make') || getExifValue(data, 'Model')) {
		const exifMake = getExifValue(data, 'Make')
		const exifModel = getExifValue(data, 'Model')
		generator.value = [exifModel].join(' ')
		// return [exifMake, exifModel].join(' ')
	} else if(data?.claim_generator) {
		generator.value = data?.claim_generator
	}
	generator.actions = getC2paActions(data)
	return generator
}
	
/**
 * Gets signature issuer
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Signature issuer name
 */
export const getSignator = data => ({
	value: data?.signature_info?.issuer
})

/**
 * Gets a localized date string from manifest entry's date
 * @function
 * @param {object} data - Manifest entry
 * @param {string} locale - Active locale
 * @return {string} - Localized date string
 */
export const getTimestamp = (data, locale) => {
	if(data?.signature_info?.time) {
		const dateObject = new Date(data?.signature_info?.time)
		return {
			value: dateObject
		}
	} else {
		const exifDateTime = getExifValue(data, 'DateTimeOriginal')
		const exifParsedDate = exifDateTime.split(/\D/)
		const dateObject = new Date(
			exifParsedDate[0],
			exifParsedDate[1] - 1,
			exifParsedDate[2],
			exifParsedDate[3],
			exifParsedDate[4],
			exifParsedDate[5]
		)
		return {
			value: dateObject
		}
	}
}

/**
 * Gets latitude and longitude
 * @function
 * @param {object} data - Manifest entry
 * @return {object} - Object of latitude (lat) and longitude (lng)
 */
export const getLocation = (data) => {
	const exifLat = getExifValue(data, 'GPSLatitude')
	const exifLatDir = getExifValue(data, 'GPSLatitudeRef')
	const lat = isNaN(exifLat)
		? convertDmsToDd(exifLat, exifLatDir)
		: parseFloat(exifLat)
	const exifLng = getExifValue(data, 'GPSLongitude')
	const exifLngDir = getExifValue(data, 'GPSLongitudeRef')
	const lng = isNaN(exifLng)
		? convertDmsToDd(exifLng, exifLngDir)
		: parseFloat(exifLng)
	if(isNaN(lat) || isNaN(lng)) return null
	return { lat, lng }
	// return { lat: 40.647843588895995, lng: -73.97376922474551 }
}

/**
 * Gets ingredients from manifest
 * @function
 * @param {object} data - Manifest entry
 * @return {array} - Array of ingredients
 */
export const getIngredients = data => {
	return []
}

/**
 * Gets actions from manifest
 * @function
 * @param {object} data - Manifest entry
 * @return {array} - Array of ingredients
 */
export const getActions = data => {
	const c2paActions = getC2paActions(data)
	return c2paActions
}

/**
 * Gets latitude and longitude
 * @function
 * @param {object} data - Manifest entry
 * @param {object} reader - C2PA reader instance
 * @return {string} - Thumbnail URL
 */
export const getThumbnail = async (data, reader) => {
	const thumbnail = data?.thumbnail
	if (!thumbnail || !reader) return null
	try {
		const bytes = await reader.resourceToBytes(thumbnail.identifier)
		if (bytes) {
			const blob = new Blob([bytes], { type: thumbnail.format })
			return {
				value: URL.createObjectURL(blob)
			}
		}
		return null
	} catch (error) {
		console.error('Failed to get thumbnail URL:', error)
		return null
	}
}

/**
 * Gets URL to CAI Verify page with image URL as parameter
 * @function
 * @param {string} src - Image URL
 * @return {string} - CAI Verify URL
 */
export const getVerifyUrl = src => `https://${VERIFY_BASE_URL}/inspect?source=${src}`

/**
 * Prepares a manifest object with extracted and formatted data
 * @async
 * @function
 * @param {object} props - Object of props
 * @param {string} props.src - Image URL
 * @param {string} props.locale - User's locale
 * @param {object} props.manifest - Manifest entry
 * @param {object} props.reader - C2PA reader instance
 * @return {Promise<object>} - Prepared manifest object
 */
export const prepareManifest = async ({ src, locale, manifest, reader }) => {
	const safeLocale = getSafeLocale(locale)
	// console.log(manifest)
	return {
		id: getId(manifest),
		timestamp: getTimestamp(manifest, safeLocale),
		producer: getProducer(manifest),
		signator: getSignator(manifest),
		generator: getGenerator(manifest),
		// ingredients: getIngredients(manifest),
		thumbnail: await getThumbnail(manifest, reader),
		location: getLocation(manifest),
		verifyUrl: getVerifyUrl(src),
	}
}

/**
 * Prepares a provenance object into sorted array of formatted manifests
 * @async
 * @function
 * @param {object} props - Object of props
 * @param {string} props.src - Image URL
 * @param {string} props.locale - User's locale
 * @param {object} props.provenance - C2PA full provenance
 * @param {object} props.reader - C2PA reader instance
 * @return {Promise<object>} - Prepared manifest object
 */
export const prepareManifests = async ({ src, locale, provenance, reader }) => {
	try {
        if (!provenance?.manifestStore) return []
        const manifests = Object.values(provenance.manifestStore.manifests ?? {})
        const preparedManifests = await Promise.all(
            manifests.map(manifest =>
				prepareManifest({ src, locale, manifest, reader })
			)
        )
        preparedManifests.sort((a, b) =>
			(a.timestamp?.getTime?.() || 0) - (b.timestamp?.getTime?.() || 0)
		)
        return preparedManifests
    } catch (error) {
        console.error(error)
        return []
    }
}