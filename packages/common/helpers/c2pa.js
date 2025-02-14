import { selectProducer, selectSocialAccounts, generateVerifyUrl } from 'c2pa'
import { getSafeLocale, getDateString } from './i18n'

export const getProducer = data => data ? selectProducer(data)?.name : null
export const getProducerSocials = data => data ? selectSocialAccounts(data) : null
export const getGenerator = data => data?.claimGenerator
export const getSignator = data => data?.signatureInfo?.issuer

const parseExifDate = (string) => {
	const parsedStr = string.split(/\D/);
	return new Date(parsedStr[0],parsedStr[1]-1,parsedStr[2],parsedStr[3],parsedStr[4],parsedStr[5]);
}
export const getTimestamp = (locale, data) => {
	if(data?.signatureInfo?.time) {
		return getDateString(locale, data?.signatureInfo?.time)
	} else {
		const exifData = data?.assertions?.get('stds.exif')[0]?.data
		const exifDateTime = exifData['exif:DateTimeOriginal']
		const exifDate = parseExifDate(exifDateTime)
		return getDateString(locale, exifDate)
	}
}
export const getIngredients = data => data?.ingredients?.length
export const getThumbnail = data => data?.thumbnail
export const getVerifyUrl = data => data ? generateVerifyUrl(data) : null
export const prepareManifest = (locale, data) => {
	const safeLocale = getSafeLocale(locale)
	return {
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