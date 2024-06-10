import { selectProducer, selectSocialAccounts, generateVerifyUrl } from 'c2pa'

import { getSafeLocale, getDateString } from './i18n'

export const getProducer = data => data ? selectProducer(data)?.name : null
export const getProducerSocials = data => data ? selectSocialAccounts(data) : null
export const getGenerator = data => data?.claimGenerator
export const getSignator = data => data?.signatureInfo?.issuer
export const getTimestamp = (locale, data) => getDateString(locale, data?.signatureInfo?.time)
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