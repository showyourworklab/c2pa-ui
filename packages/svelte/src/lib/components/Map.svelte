<script>
    import { getContext, untrack } from 'svelte';
	import MapLibre, { AttributionControl } from 'maplibre-gl'
	import { classNames } from 'syw-common/helpers'
	import { getLangFromLocale } from 'syw-common/helpers/i18n'
	import { updateMapLang } from 'syw-common/helpers/map'
	import { MAP_PROPS } from 'syw-common/constants/map';
	const id = $props.id();
	const { locale } = getContext('i18nStoreContext')
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
			...mapOptions
		})
		.addControl(new AttributionControl({
			// compact: true
		}))
		map = mapInstance
		mapInstance.on('load', () => {
			loaded = true
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