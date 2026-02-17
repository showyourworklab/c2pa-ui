//////////////// Variants ///////////////
export const VARIANT_KEYS = [
	"expand",
	"modal"
]
export const VARIANT_DEFAULT = "expand"

/////////////// Manifests //////////////
export const MANIFEST_KEYS = [
	'producer',
	// 'producerSocials',
	'timestamp',
	'signator',
	// 'ingredients',
	'generator',
	// 'verify',
	'location',
]
export const MANIFEST_PREVIEW_TITLE_KEYS = [
	'signator',
	'generator'
]

///////////////// Map /////////////////
export const MAP_ZOOM = 5
// export const MAP_STYLE = 'https://demotiles.maplibre.org/style.json',
// export const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
// export const MAP_STYLE = 'https://tiles.openfreemap.org/styles/liberty',
// export const MAP_STYLE = 'https://tiles.openfreemap.org/styles/positron',
export const MAP_STYLE = 'https://tiles.openfreemap.org/styles/bright'
export const MAP_PROPS = {
	zoom: 8,
	style: MAP_STYLE
}
export const MAP_LABEL_LAYERS = [
	'label_other',
	'label_village',
	'label_town',
	'label_state',
	'label_city',
	'label_city_capital',
	'label_country_3',
	'label_country_2',
	'label_country_1',
]