import { IPTC_NEWS_CODES, IPTC_NEWS_CODES_BASE_URI } from "../constants/iptc";

export const getIptcNewsCode = value => {
	const uri = value?.includes(IPTC_NEWS_CODES_BASE_URI)
		? value
		: `${IPTC_NEWS_CODES_BASE_URI}/value`
	return IPTC_NEWS_CODES.find(n =>
		n.uri === uri
	)
}
export const getIptcNewsCodeKey = uri => String(uri).replace(`${IPTC_NEWS_CODES_BASE_URI}/`, "")
export const getIptcNewsCodeLabel = newsCode => newsCode?.prefLabel[`en-GB`]
export const getIptcNewsCodeDefinition = newsCode => newsCode?.definition[`en-GB`]
