import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useId, useState } from 'react'
import { Map as MapLibre } from 'maplibre-gl'
import { classNames } from 'syw-common/helpers'
import { getLangFromLocale } from 'syw-common/helpers/i18n'
import { updateMapLang } from 'syw-common/helpers/map'
import { MAP_PROPS } from 'syw-common/constants/map';
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui';
// TODO: https://maplibre.org/maplibre-gl-js/docs/examples/add-support-for-right-to-left-scripts/
const Map = ({
	location
}) => {
	const id = useId()
	const { locale } = useI18nContext()
	const { mapOptions } = useUiContext()
	const [map, setMap] = useState(null)
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const mapInstance = new MapLibre({
			container: classNames(id),
			center: [location.lng, location.lat],
			locale: locale,
			// interactive: false,
			...MAP_PROPS,
			...mapOptions
		})
		setMap(mapInstance)
		mapInstance.on('load', () => setLoaded(true))
	}, [id])

	useEffect(() => {
		if(!loaded) return
		const lang = getLangFromLocale(locale)
		updateMapLang(map, lang)
	}, [map, locale, loaded])
	
	return (
		<figure
			className={classNames('Map')}
		>
			<div
				id={classNames(id)}
				className={classNames('MapContainer')}
			/>
		</figure>
	)
}

export default Map