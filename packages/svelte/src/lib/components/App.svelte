<script>
	import { onMount, setContext } from 'svelte'
	import { createC2pa } from 'c2pa'
	import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url'
	import workerSrc from 'c2pa/dist/c2pa.worker.min.js?url'
	import 'syw-common/css/globals.css'
	import styles from 'syw-common/css/App.module.css'
	import { joinClassNames } from 'syw-common/helpers'
	import { prepareManifest } from 'syw-common/helpers/c2pa'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
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
	
	const dataStore = createDataStore()
	const i18nStore = createI18nStore()
	const uiStore = createUiStore()
	setContext('dataStoreContext', dataStore)
	setContext('i18nStoreContext', i18nStore)
	setContext('uiStoreContext', uiStore)

	const { lang } = i18nStore
	const {
		variant: _variant,
		isHoverImage,
		isProvenanceOpen,
		compareImage
	} = uiStore

	const classes = $derived(
		joinClassNames(
			styles.App,
			styles[`App_${variant}`],
			$isHoverImage ? styles.App_hovered : false,
			$isProvenanceOpen ? styles.App_active : false
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

	$effect(() => {
		if(mounted && src) {
			(async () => {
				const c2pa = await createC2pa({
					wasmSrc,
					workerSrc,
				})
				try {
					// Read in the image and get a manifest store
					const { manifestStore } = await c2pa.read(src)
					// Get the active manifest
					const newManifests = Object.values(manifestStore?.manifests ?? {})
						.map(manifest => prepareManifest(locale, manifest))
					// Set manifests to data store
					dataStore.setManifests(newManifests)
				} catch (err) {
					console.error('Error reading image:', err)
				}
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
			<Explainer />
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