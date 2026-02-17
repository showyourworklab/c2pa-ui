/**
 * Changes the map symbol language
 * @param {object} map - MapLibre instance
 * @param {string} lang - ISO language code (i.e. en)
 */
export const updateMapLang = (map, lang) => {
	if(!map || !lang) return
	// Creates an array of all symbol layer IDs
	// console.log(map)
	const layers = map.getStyle()?.layers
		// .filter(layer => layer.type === 'symbol')
		.filter(layer => String(layer.id).includes('label_'))
		.map(layer => layer.id)
	// console.log(layers)
	if(!layers.length) return
	// Sets all symbol layers to new language with fallback
	for(const layer of layers) {
		map.setLayoutProperty(layer, 'text-field', [
			'coalesce',
			['get', `name:${lang}`],
			['get', 'name']
		])
	}
}