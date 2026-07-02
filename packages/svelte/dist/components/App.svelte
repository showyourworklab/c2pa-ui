<script>
	import { onMount, setContext } from 'svelte'
	import 'syw-common/css/styles.css'
	import { classNames, getMediaType } from 'syw-common/helpers'
	import { VARIANT_DEFAULT } from 'syw-common/constants'
	import createC2paStore from '../store/c2pa.js'
	import createDataStore from '../store/data.js'
	import createI18nStore from '../store/i18n.js'
	import createUiStore from '../store/ui.js'
	import Figure from './Figure.svelte'
	import Image from './Image.svelte'
	import Video from './Video.svelte'
	import Explainer from './Explainer.svelte'
	import Cutline from './Cutline.svelte'
	import Caption from './Caption.svelte'
	import ProvenanceModal from './ProvenanceModal.svelte'
	import ProvenanceExpand from './ProvenanceExpand.svelte'
	import Thumbnail from './Thumbnail.svelte'

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
		variant: _variant,
		isImageHover,
		isProvenanceOpen,
		isThumbnailOpen
	} = uiStore

	const classes = $derived(
		classNames(
			'App',
			`App_${variant}`,
			$isImageHover ? 'App_hovered' : false,
			$isProvenanceOpen ? 'App_active' : false
		)
	)

	const mediaType = $derived(getMediaType(src))

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

{#if mounted}
	<div
		lang={$lang}
		class={classes}
		bind:this={elemRef}
	>
		<Figure>
			{#if mediaType === 'image'}
				<Image />
			{/if}
			{#if mediaType === 'video'}
				<Video />
			{/if}
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
		<!-- {#if $isThumbnailOpen}
			<Thumbnail />
		{/if} -->
	</div>
{/if}