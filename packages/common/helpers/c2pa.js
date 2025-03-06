import { selectProducer, selectSocialAccounts, generateVerifyUrl } from 'c2pa'
import { getSafeLocale } from './i18n'

export const getId = data => data?.instanceId

export const getProducer = data => data ? {
	name: selectProducer(data)?.name,
	socials: selectSocialAccounts(data)
} : null

/**
 * Gets a description of claim generator
 * @function
 * @param {object} data - Manifest entry
 * @return {string} - List of generator names with version (i.e. Lightroom Classic 14.0)
 */
export const getGenerator = data =>
	data?.claimGeneratorInfo.map(d =>
		[d.name, d.version]
			.filter(d => d !== null && d !== undefined)
			.join(" ")
	).join(", ")

export const getSignator = data => data?.signatureInfo?.issuer

/**
 * Gets a localized date string from manifest entry's date
 * @function
 * @param {string} locale - Active locale
 * @param {object} data - Manifest entry
 * @return {string} - Localized date string
 */
export const getTimestamp = (locale, data) => {
	if(data?.signatureInfo?.time) {
		const dateObject = new Date(data?.signatureInfo?.time)
		return dateObject
	} else {
		const exifData = data?.assertions?.get('stds.exif')[0]?.data
		const exifDateTime = exifData['exif:DateTimeOriginal']
		const exifParsedDate = exifDateTime.split(/\D/);
		const dateObject = new Date(
			exifParsedDate[0],
			exifParsedDate[1] - 1,
			exifParsedDate[2],
			exifParsedDate[3],
			exifParsedDate[4],
			exifParsedDate[5]
		);
		return dateObject
	}
}

export const getIngredients = data => data?.ingredients
export const getThumbnail = data => data?.thumbnail
export const getVerifyUrl = data => data ? generateVerifyUrl(data) : null
export const prepareManifest = (locale, data) => {
	const safeLocale = getSafeLocale(locale)
	return {
		id: getId(data),
		producer: getProducer(data),
		generator: getGenerator(data),
		signator: getSignator(data),
		timestamp: getTimestamp(safeLocale, data),
		ingredients: getIngredients(data),
		thumbnail: getThumbnail(data),
		// verifyUrl: getVerifyUrl(data),
		// verifyUrl: https://verify.contentauthenticity.org/inspect?source=
	}
}