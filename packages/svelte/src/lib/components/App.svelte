<script>
	import { onMount } from 'svelte';
	import { createC2pa } from 'c2pa';
	import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url';
	import workerSrc from 'c2pa/dist/c2pa.worker.min.js?url';

	import '$common/css/globals.scss'
	import styles from '$common/css/App.module.scss'
	import { joinClassNames } from '$common/helpers'
	import { prepareManifest, getSummary } from '$common/helpers/c2pa'
	import { lang, setLocale } from '$lib/store/i18n.js'
	import { setSrc, setAlt, setCaption, setByline, setOrigin, setManifests } from '$lib/store/data.js'
	import { isHoverImage, isShowProvenance } from '$lib/store/ui.js'
	import Figure from './Figure.svelte'
	import Image from './Image.svelte'
	import Explainer from './Explainer.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import Provenance from './Provenance.svelte'

	export let src = ''
	export let alt = ''
	export let caption = ''
	export let byline = ''
	export let origin = ''
	export let locale = ''

	$: setSrc(src)
	$: setAlt(alt)
	$: setCaption(caption)
	$: setByline(byline)
	$: setOrigin(origin)
	$: setLocale(locale)

	onMount(async () => {
		const c2pa = await createC2pa({
			wasmSrc,
			workerSrc,
		})
		try {
			// Read in the image and get a manifest store
			const c2paData = await c2pa.read(src);
			const { manifestStore } = c2paData
			getSummary(manifestStore)
			// Get the active manifest
			const newManifests = Object.values(manifestStore?.manifests ?? {})
				.map(manifest => prepareManifest(locale, manifest))
			// Set manifests to data store
			setManifests(newManifests)
		} catch (err) {
			console.error('Error reading image:', err);
		}
	})

	$: classes = joinClassNames(
		styles.App,
		$isHoverImage ? styles.App_hovered : false,
		$isShowProvenance ? styles.App_active : false
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