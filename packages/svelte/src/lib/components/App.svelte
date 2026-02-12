<script>
	import { onMount, setContext } from 'svelte'
	import 'syw-common/css/styles.css'
	import { classNames } from 'syw-common/helpers'
	import { prepareManifest } from 'syw-common/helpers/c2pa'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
	import createC2paStore from '$lib/store/c2pa.js'
	import createDataStore from '$lib/store/data.js'
	import createI18nStore from '$lib/store/i18n.js'
	import createUiStore from '$lib/store/ui.js'
	import Figure from './Figure.svelte'
	import Image from './Image.svelte'
	import Explainer from './Explainer.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import ProvenanceModal from './ProvenanceModal.svelte'
	import ProvenanceExpand from './ProvenanceExpand.svelte'
	import ImageCompare from './ImageCompare.svelte'

	const {
		variant = VARIANT_DEFAULT,
		src = '',
		alt = '',
		caption = '',
		byline = '',
		locale = '',
		onEvent = null
	} = $props()

	let mounted = $state(false)
	let elemRef = $state(null)
	
	const c2paStore = createC2paStore()
	const dataStore = createDataStore()
	const i18nStore = createI18nStore()
	const uiStore = createUiStore()
	setContext('c2paStoreContext', c2paStore)
	setContext('dataStoreContext', dataStore)
	setContext('i18nStoreContext', i18nStore)
	setContext('uiStoreContext', uiStore)

	const { c2pa, reader, provenance } = c2paStore
	const { lang } = i18nStore
	const {
		variant: _variant,
		isImageHover,
		isProvenanceOpen,
		compareImage
	} = uiStore

	const classes = $derived(
		classNames(
			'App',
			`App_${variant}`,
			$isImageHover ? 'App_hovered' : false,
			$isProvenanceOpen ? 'App_active' : false
		)
	)

	$effect(() => {
		dataStore.setSrc(src)
		dataStore.setAlt(alt)
		dataStore.setCaption(caption)
		dataStore.setByline(byline)
		i18nStore.setLocale(locale)
		uiStore.setEventHandler(onEvent)
		uiStore.setElem(elemRef)
		uiStore.setVariant(variant)
	})

	// Initialize C2PA and read image when mounted and src changes
	$effect(() => {
		if (mounted && src) {
			(async () => {
				// Initialize C2PA if not already done
				let c2paInstance = $c2pa
				if (!c2paInstance) {
					c2paInstance = await c2paStore.init()
				}
				
				if (!c2paInstance) return

				try {
					// Read C2PA data
					await c2paStore.read(src)
				} catch (err) {
					console.error('Error reading image:', err)
				}
			})()
		}
	})

	// Prepare manifests when provenance changes
	$effect(() => {
		if ($provenance?.manifestStore && $reader) {
			(async () => {
				const newManifests = await Promise.all(
					Object.values($provenance.manifestStore.manifests ?? {})
						.map(manifest => prepareManifest({
							src,
							locale,
							manifest,
							reader: $reader
						}))
				)
				dataStore.setManifests(newManifests)
			})()
		}
	})

	onMount(() => {
		mounted = true
	})

</script>

{#if mounted}
	<div
		lang={$lang}
		class={classes}
		bind:this={elemRef}
	>
		<Figure>
			<Image />
			{#if $_variant === 'expand'}
				<Explainer />
			{/if}
			<Cutline />
			<Caption />
		</Figure>
		
		{#if $_variant === 'expand'}
			<ProvenanceExpand />
		{/if}
		{#if $_variant === 'modal'}
			<ProvenanceModal />
		{/if}
		{#if $compareImage}
			<ImageCompare />
		{/if}
	</div>
{/if}