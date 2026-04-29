import TRUST_LISTS from 'syw-common/trustlists'
import { VERIFY_BASE_URL } from 'syw-common/constants/index.js'
import { C2PA_WEB_WASM_CDN_URL } from 'syw-common/constants/c2pa.js'
import { getMediaType } from './index.js'
import { getSafeLocale } from './i18n.js'
import { getIptcNewsCode, getIptcNewsCodeDefinition, getIptcNewsCodeKey, getIptcNewsCodeLabel } from './iptc.js'

/////////////// Initialize //////////////

/**
 * Creates C2PA instance configuration
 * @param {object} c2paOptions - Optional overrides
 * @param {string} c2paOptions.wasmSrc - Custom WASM source URL
 * @param {string | string[] | } c2paOptions.trustLists - Custom trust anchors file
 * @return {object} - C2PA configuration object
 */
export const getC2paConfig = (c2paOptions = {}) => ({
	wasmSrc: c2paOptions.wasmSrc || C2PA_WEB_WASM_CDN_URL,
	settings: {
		...(c2paOptions?.settings?.trust || {}),
		trust: {
			...(c2paOptions?.settings?.trust?.trustAnchors || {}),
			trustAnchors: c2paOptions?.settings?.trust?.trustAnchors || joinPem(Object.values(TRUST_LISTS)),
		}
	}
})

/**
 * Reads C2PA data from an image source
 * @async
 * @param {object} c2pa - C2PA instance
 * @param {string} src - Image URL
 * @return {Promise<{manifestStore: object, reader: object}>} - Manifest store and reader
 */
export const readC2paFromUrl = async (c2pa, src) => {
	let reader
	const mediaType = getMediaType(src)
	if(mediaType === "image") {
		const response = await fetch(src)
		const blob = await response.blob()
		reader = await c2pa.reader.fromBlob(blob.type, blob)
	} else if(mediaType === "video") {
		const response = await fetch(src)
		const blob = await response.blob()
		reader = await c2pa.reader.fromBlob(blob.type, blob)
	}
    const manifestStore = await reader?.manifestStore()
    return { manifestStore, reader }
}

/**
 * Reads C2PA validity status
 * @async
 * @param {object} c2pa - C2PA instance
 * @param {string} src - Image URL
 * @return {Promise<{manifestStore: object, reader: object}>} - Manifest store and reader
 */
export const getC2paStatus = async (provenance) => {
	if(provenance) {
		const validationStatus = provenance?.manifestStore?.validation_state;
		if(validationStatus === "Trusted") {
			return "trusted";
		} else if(validationStatus === "Valid") {
			return "valid";
		} else if(validationStatus === "Invalid") {
			return "invalid";
		} else {
			return "unknown";
		}
	} else {
		return "validating";
	}
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
	const exifValue = exifData && exifData[`exif:${key}`]
	return exifValue;
}

/**
 * Checks if an EXIF value exists in manifest
 * @function
 * @param {object} data - Manifest entry
 * @return {boolean} - Boolean
 */
export const ifHasExif = (data) => {
	return data?.assertions?.some(a => a.label === 'stds.exif')
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

/**
 * Joins strings of PEM file contents
 * @function
 * @param  {string[]} pems - Array of raw string of PEM file contents
 * @returns {string} - Compined string of PEM file contents
 */
const joinPem = (pems) => {
	return pems.map(cleanPem).join("\n")
}

/**
 * Cleans string of PEM file contents
 * @function
 * @param {string} pem - Raw string of PEM file contents
 * @returns {string} - Cleaned string of PEM file contents
 */
const cleanPem = (pem) => {
	const certs = pem.match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g);
	return certs ? certs.join("\n") : "";
}

/////////////// Manifest Creation ///////////////

/**
 * Gets manifest ID
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Instance ID
 */
export const getId = data => data?.instance_id

/**
 * Gets producer name
 * @function
 * @param {object} manifest - Manifest entry
 * @return {string} - Producer name
 */
export const getProducer = manifest => {
	const authorObj = getSchemaOrgValue(manifest, 'author')
	return authorObj ?? []
}

/**
 * Gets a description of claim generator
 * @function
 * @param {object} manifest - Manifest entry
 * @return {string} - List of generator names with version (i.e. Lightroom Classic 14.0)
 */
export const getGenerator = manifest => {
	let generator = {}
	if(manifest?.claim_generator_info) {
		generator.value = manifest?.claim_generator_info?.map(d =>
			[d.name, d.version]
				.filter(d => d !== null && d !== undefined)
				.join(" ")
		).join(", ")
	} else if(getExifValue(manifest, 'Make') || getExifValue(manifest, 'Model')) {
		const exifMake = getExifValue(manifest, 'Make')
		const exifModel = getExifValue(manifest, 'Model')
		generator.value = [exifModel].join(' ')
		// return [exifMake, exifModel].join(' ')
	} else if(manifest?.claim_generator) {
		generator.value = manifest?.claim_generator
	}
	generator.actions = getC2paActions(manifest)
	return generator
}

/**
 * Gets manifest type
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - Manifest type
 */
export const getType = manifest => {
	const hasExif = ifHasExif(manifest)
	const createdAction = getC2paActions(manifest)?.find(a => a?.action === "c2pa.created")
	let typeKey, typeLabel, typeDefinition
	if(createdAction) {
		const iptcNewsCodeUri = createdAction?.digitalSourceType
		const iptcNewsCode = getIptcNewsCode(iptcNewsCodeUri)
		typeKey = getIptcNewsCodeKey(iptcNewsCodeUri)
		typeLabel = getIptcNewsCodeLabel(iptcNewsCode)
		typeDefinition = getIptcNewsCodeDefinition(iptcNewsCode)
	} else if(hasExif) {
		typeKey = "camera"
		typeLabel = "Camera"
	}
	// console.log({
	// 	iptcNewsCodeUri,
	// 	iptcNewsCode,
	// 	typeKey,
	// 	typeLabel,
	// 	typeDefinition,
	// })
	return typeKey ? {
		key: typeKey,
		label: typeLabel,
		definition: typeDefinition,
	} : null
}

export const getTypes = manifests =>
	manifests?.map(m => m?.type)?.filter(m => m) ?? []

/**
 * Gets a 
 * @function
 * @param {object} manifest - Manifest entry
 * @return {string} - 
 */
export const getStatus = (manifest, provenance) => {
	const { validation_results, active_manifest } = provenance?.manifestStore;
	let validation;

	if (manifest.label === active_manifest) {
		validation = validation_results?.activeManifest ?? null;
	} else {
		const ingredientDelta = validation_results?.ingredientDeltas?.find(
		({ validationDeltas }) =>
			validationDeltas.success.some(({ url }) =>
				url.includes(manifest.label ?? '')
			) ||
			validationDeltas.failure.some(({ url }) =>
				url.includes(manifest.label ?? '')
			)
		);
		validation = ingredientDelta?.validationDeltas ?? null;
	}
	const status = validation !== null && validation.failure.length === 0
		? "trusted"
		: "invalid";
	return status;
}
	
/**
 * Gets signature issuer
 * @function
 * @param {object} manifest - Manifest entry
 * @return {string} - Signature issuer name
 */
export const getSignator = manifest => ({
	value: manifest?.signature_info?.issuer
})

/**
 * Gets a localized date string from manifest entry's date
 * @function
 * @param {object} manifest - Manifest entry
 * @param {string} locale - Active locale
 * @return {string} - Localized date string
 */
export const getTimestamp = (manifest, locale) => {
	if(manifest?.signature_info?.time) {
		const dateObject = new Date(manifest?.signature_info?.time)
		return {
			value: dateObject
		}
	} else {
		const exifDateTime = getExifValue(manifest, 'DateTimeOriginal')
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
 * @param {object} manifest - Manifest entry
 * @return {object} - Object of latitude (lat) and longitude (lng)
 */
export const getLocation = (manifest) => {
	const exifLat = getExifValue(manifest, 'GPSLatitude')
	const exifLatDir = getExifValue(manifest, 'GPSLatitudeRef')
	const lat = isNaN(exifLat)
		? convertDmsToDd(exifLat, exifLatDir)
		: parseFloat(exifLat)
	const exifLng = getExifValue(manifest, 'GPSLongitude')
	const exifLngDir = getExifValue(manifest, 'GPSLongitudeRef')
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
export const getIngredients = manifest => {
	return []
}

/**
 * Gets actions from manifest
 * @function
 * @param {object} manifest - Manifest entry
 * @return {array} - Array of ingredients
 */
export const getActions = manifest => {
	const c2paActions = getC2paActions(manifest)
	return c2paActions
}

/**
 * Gets latitude and longitude
 * @function
 * @param {object} manifest - Manifest entry
 * @param {object} reader - C2PA reader instance
 * @return {string} - Thumbnail URL
 */
export const getThumbnail = async (manifest, reader) => {
	const thumbnail = manifest?.thumbnail
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
export const prepareManifest = async ({ src, locale, manifest, provenance, reader }) => {
	const safeLocale = getSafeLocale(locale)

	return {
		id: getId(manifest),
		type: getType(manifest),
		status: getStatus(manifest, provenance),
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
				prepareManifest({ src, locale, manifest, provenance, reader })
			)
        )
		preparedManifests.sort((a, b) =>
			(a?.timestamp?.value?.getTime?.() || 0) - (b?.timestamp?.value?.getTime?.() || 0)
		)
		
        return preparedManifests
    } catch (error) {
        console.error(error)
        return []
    }
}