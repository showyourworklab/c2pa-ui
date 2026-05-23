export const VERIFY_BASE_URL = 'verify.contentauthenticity.org'
//////////////// Variants ///////////////
export const VARIANT_KEYS = [
	'expand',
	'modal'
]
export const VARIANT_DEFAULT = 'expand'
/////////////// Manifests //////////////
export const MANIFEST_KEYS = [
	'producer',
	'timestamp',
	'signator',
	'generator',
	'actions',
	// 'ingredients',
	// 'verify',
	'location',
]
export const MANIFEST_PRIMARY_KEYS = [
	'producer',
	'timestamp',
	'signator',
	'generator',
]
export const MANIFEST_SECONDARY_KEYS = [
	'location',
	'actions'
]
export const MANIFEST_PREVIEW_TITLE_KEYS = [
	'signator',
	'generator'
]
///////////////// Icons ////////////////
export const ICON_DEFAULT_SIZE = 24
export const ICON_DEFAULT_STROKE_WIDTH = 2