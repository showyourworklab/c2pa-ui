<script>
	import { onMount, setContext } from 'svelte';
	import { createC2pa } from 'c2pa';
	import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
	import workerSrc from 'c2pa/dist/c2pa.worker.min.js?url';
	import 'syw-common/css/globals.css'
	import styles from 'syw-common/css/App.module.css'
	import { joinClassNames } from 'syw-common/helpers'
	import { prepareManifest } from 'syw-common/helpers/c2pa'
	import createDataStore from '$lib/store/data.js'
	import createI18nStore from '$lib/store/i18n.js'
	import createUiStore from '$lib/store/ui.js'
	import Figure from './Figure.svelte'
	import Image from './Image.svelte'
	import Explainer from './Explainer.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import Provenance from './Provenance.svelte'

	const dataStore = createDataStore()
	const i18nStore = createI18nStore()
	const uiStore = createUiStore()
	setContext('dataStoreContext', dataStore)
	setContext('i18nStoreContext', i18nStore)
	setContext('uiStoreContext', uiStore)

	export let src = ''
	export let alt = ''
	export let caption = ''
	export let byline = ''
	export let locale = ''
	export let onEvent = null

	$: dataStore.setSrc(src)
	$: dataStore.setAlt(alt)
	$: dataStore.setCaption(caption)
	$: dataStore.setByline(byline)
	$: i18nStore.setLocale(locale)
	$: uiStore.setEventHandler(onEvent)

	const { lang } = i18nStore;
	const { isHoverImage, isProvenanceOpen } = uiStore;

	const update = async (_src) => {
		const c2pa = await createC2pa({
			wasmSrc,
			workerSrc,
		})
		try {
			// Read in the image and get a manifest store
			const { manifestStore } = await c2pa.read(_src);
			// Get the active manifest
			const newManifests = Object.values(manifestStore?.manifests ?? {})
				.map(manifest => prepareManifest(locale, manifest))
			// Set manifests to data store
			dataStore.setManifests(newManifests)
		} catch (err) {
			console.error('Error reading image:', err);
		}
	}

	onMount(() => {
		update(src)
	});
	// $: update(), [src]

	$: classes = joinClassNames(
		styles.App,
		$isHoverImage ? styles.App_hovered : false,
		$isProvenanceOpen ? styles.App_active : false
	)

</script>

<div
	class={classes}
	lang={$lang}
>
	<Figure>
		<Image />
		<Explainer />
		<Cutline />
		<Caption />
	</Figure>
	<Provenance />
</div>