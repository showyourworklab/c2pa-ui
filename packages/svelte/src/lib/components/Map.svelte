<script>
    import { getContext, untrack } from 'svelte';
	import MapLibre from 'maplibre-gl'
	import { classNames } from 'syw-common/helpers'
	import { getLangFromLocale } from 'syw-common/helpers/i18n'
	import { createMapLayer, createMapSource, updateMapLang } from 'syw-common/helpers/map'
import { MAP_PROPS, MAP_SOURCE_ID } from 'syw-common/constants/map'
	import { getI18nContext } from '$lib/store/i18n.js'
	const id = $props.id();
	const { locale } = getI18nContext()
	const { mapOptions } = getContext('uiStoreContext')
	let map = $state(null)
	let loaded = $state(false)

	const { location } = $props()
	
	$effect(() => {
		if(loaded) return
		const mapInstance = new MapLibre.Map({
			container: classNames(id),
			center: [location.lng, location.lat],
			locale: $locale,
			// interactive: false,
			...MAP_PROPS,
			...$mapOptions
		})
		// mapInstance.addControl(new MapLibre.AttributionControl({
		// 	compact: true
		// }))
		map = mapInstance
		mapInstance.on('load', () => {
			loaded = true
			const mapSource = createMapSource(location.lng, location.lat)
			const mapLayer = createMapLayer()
			mapInstance.addSource(MAP_SOURCE_ID, mapSource)
			mapInstance.addLayer(mapLayer)
		})
	})

	$effect(() => {
		if(!loaded) return
		const lang = getLangFromLocale($locale)
		updateMapLang(untrack(() => map), lang)
	})

</script>

<figure
	class={classNames('Map')}
>
	<div
		id={classNames(id)}
		class={classNames('MapContainer')}
	>
	</div>
</figure>