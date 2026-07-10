import type { IptcNewsCode } from "#constants/iptc";
import { IPTC_NEWS_CODES, IPTC_NEWS_CODES_BASE_URI } from "#constants/iptc";

export const getIptcNewsCode = (value: string | null | undefined): IptcNewsCode | undefined => {
	const uri = value?.includes(IPTC_NEWS_CODES_BASE_URI)
		? value
		: `${IPTC_NEWS_CODES_BASE_URI}/value`
	return IPTC_NEWS_CODES.find(n =>
		n.uri === uri
	)
}
export const getIptcNewsCodeKey = (uri: string | null | undefined) => uri && String(uri).replace(`${IPTC_NEWS_CODES_BASE_URI}/`, "")
export const getIptcNewsCodeLabel = (newsCode: IptcNewsCode | null | undefined) => newsCode?.prefLabel[`en-GB`]
export const getIptcNewsCodeDefinition = (newsCode: IptcNewsCode | null | undefined) => newsCode?.definition[`en-GB`]
