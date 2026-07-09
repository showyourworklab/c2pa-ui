<script>
	import { onMount, setContext } from 'svelte'
	import 'syw-common/css/styles.css'
	import { classNames } from 'syw-common/helpers'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
	import { C2PA_PHASES } from 'syw-common/constants/c2pa'
	import createC2paStore from '../store/c2pa.js'
	import createDataStore from '../store/data.js'
	import createI18nStore from '../store/i18n.js'
	import createUiStore from '../store/ui.js'
	import Figure from './Figure.svelte'
	import Media from './Media.svelte'
	import Explainer from './Explainer.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import ProvenanceModal from './ProvenanceModal.svelte'
	import ProvenanceExpand from './ProvenanceExpand.svelte'

	const {
		variant = VARIANT_DEFAULT,
		src = '',
		alt = '',
		caption = '',
		byline = '',
		locale = '',
		mapOptions = null,
		onEvent = null
	} = $props()

	let mounted = $state(false)
	let elemRef = $state(null)
	let prevSrc = $state(null)
	let prevLocale = $state(null)

	const c2paStore = createC2paStore()
	const dataStore = createDataStore()
	const i18nStore = createI18nStore()
	const uiStore = createUiStore()

	setContext('c2paStoreContext', c2paStore)
	setContext('dataStoreContext', dataStore)
	setContext('i18nStoreContext', i18nStore)
	setContext('uiStoreContext', uiStore)

	const { c2pa } = c2paStore
	const { lang } = i18nStore
	const {
		isImageHover,
		isProvenanceOpen,
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
	})

	$effect(() => {
		uiStore.setElem(elemRef)
		uiStore.setEventHandler(onEvent)
		uiStore.setVariant(variant)
		uiStore.setMapOptions(mapOptions)
	})

	$effect(() => {
		i18nStore.setLocale(locale)
	})

	$effect(() => {
		if (!mounted) return
		if(src === prevSrc && locale === prevLocale) return
		prevSrc = src
		prevLocale = locale

		;(async () => {
			dataStore.setPhase(C2PA_PHASES.LOADING)
			let c2paInstance = $c2pa
			if (!c2paInstance) c2paInstance = await c2paStore.init()
			const newData = await c2paStore.read({ src, locale })
			if (import.meta.env.DEV) {
				console.log({ src, alt, caption, byline, ...newData })
			}
			dataStore.setC2paData(newData)
		})()
	})

	onMount(() => {
		mounted = true
	})
</script>

<div
	lang={$lang}
	class={classes}
	bind:this={elemRef}
>
	<Figure>
		<Media />
		{#if variant === 'expand'}
			<Explainer />
		{/if}
		<Cutline />
		<Caption />
	</Figure>

	{#if variant === 'expand'}
		<ProvenanceExpand />
	{/if}
	{#if variant === 'modal'}
		<ProvenanceModal />
	{/if}
</div>