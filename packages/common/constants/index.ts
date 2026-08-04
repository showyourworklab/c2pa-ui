// export const VERIFY_BASE_URL = 'originverify.iptc.org'
export const VERIFY_BASE_URL = 'verify.contentauthenticity.org'
//////////////// Variants ///////////////
export const VARIANT_KEYS = [
	'expand',
	'modal'
]
export const VARIANT_DEFAULT = 'expand'
/////////////// Manifests //////////////
export const MANIFEST_KEYS = [
	'timestamp',
	'producer',
	'signator',
	'generator',
	'actions',
	// 'ingredients',
	// 'verify',
	'location',
] as const
export const MANIFEST_PRIMARY_KEYS = [
	'timestamp',
	'producer',
	'signator',
	'generator',
] as const
export const MANIFEST_SECONDARY_KEYS = [
	'location',
	// 'actions',
	'thumbnail'
] as const
export const MANIFEST_PREVIEW_TITLE_KEYS = [
	'signator',
	'generator'
] as const
export const MANIFEST_CONTENT_TAB_KEYS = {
	camera: ['thumbnail', 'location'],
	edit: ['thumbnail', 'actions'],
	ai: ['thumbnail', 'actions'],
} as const

export const MANIFEST_CONTENT_TAB_DEFAULT = 'thumbnail'
///////////////// Icons ////////////////
export const ICON_DEFAULT_SIZE = 24
export const ICON_DEFAULT_STROKE_WIDTH = 2