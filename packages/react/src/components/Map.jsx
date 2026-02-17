import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useId, useState } from 'react'
import { Map as MapLibre } from 'maplibre-gl'
import { classNames } from 'syw-common/helpers'
import { getLangFromLocale } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui';
import { MAP_PROPS } from 'syw-common/constants';
// TODO: https://maplibre.org/maplibre-gl-js/docs/examples/add-support-for-right-to-left-scripts/
const Map = ({
	location
}) => {
	const id = useId()
	const { locale } = useI18nContext()
	const { mapOptions } = useUiContext()
	const [map, setMap] = useState(null)
	const [loaded, setLoaded] = useState(false)

	/**
	 * Changes the map symbol language
	 * @param {string} lang - ISO language code (i.e. en)
	 */
	const changeLang = (lang) => {
		// Creates an array of all symbol layer IDs
		const layers = map.getStyle().layers
			// .filter(layer => layer.type === 'symbol')
			.filter(layer => String(layer.id).includes('label_'))
			.map(layer => layer.id)
		console.log(layers)
		// Sets all symbol layers to new language with fallback
		for(const layer of layers) {
			// map.setLayoutProperty(layer, 'text-field', [
			// 	'coalesce',
			// 	['get', `name:${lang}`],
			// 	['get', 'name']
			// ])
		}
	}

	useEffect(() => {
		const map = new MapLibre({
			container: id,
			center: [location.lng, location.lat],
			locale: locale,
			// interactive: false,
			...MAP_PROPS,
			...mapOptions
		})
		setMap(map)
		map.on('load', () => setLoaded(true))
	}, [id])

	useEffect(() => {
		if(!loaded) return
		const lang = getLangFromLocale(locale)
		changeLang(lang)
	}, [locale, loaded])
	
	return (
		<figure
			className={classNames('Map')}
		>
			<div
				id={id}
				className={classNames('MapContainer')}
			/>
		</figure>
	)
}

export default Map