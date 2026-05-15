export const C2PA_WEB_VERSION = '0.6.1'
export const C2PA_WEB_WASM_CDN_URL = `https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web@${C2PA_WEB_VERSION}/dist/resources/c2pa_bg.wasm`
export const C2PA_CREATED_IPTC = [
	"http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"
]
export const C2PA_PHASES = {
	IDLE: 'idle',
	LOADING: 'loading',
	READY: 'ready',
	ERROR: 'error',
}
export const C2PA_STATUSES = {
	VALIDATING: 'validating',
	UNKNOWN: 'unknown',
	TRUSTED: 'trusted',
	VALID: 'valid',
	INVALID: 'invalid',
}
export const C2PA_DATA_DEFAULT = {
	phase: C2PA_PHASES.IDLE,
	status: C2PA_STATUSES.VALIDATING,
	manifests: [],
	types: [],
	provenance: null,
	reader: null,
	error: null,
}