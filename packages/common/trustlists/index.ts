import C2PA_TRUST_LIST from './c2pa'
import C2PA_INTERIM_TRUST_LIST from './c2pa-interim'
import IPTC_TRUST_LIST from './iptc'
import SONY_TRUST_LIST from './sony'
export {
	C2PA_TRUST_LIST,
	C2PA_INTERIM_TRUST_LIST,
	IPTC_TRUST_LIST,
	SONY_TRUST_LIST
}
export const TRUST_LISTS = {
	'c2pa': C2PA_TRUST_LIST,
	'c2pa-interim': C2PA_INTERIM_TRUST_LIST,
	'iptc': IPTC_TRUST_LIST,
	'sony': SONY_TRUST_LIST
}
export default TRUST_LISTS