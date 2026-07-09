<script>
	import { getContext } from 'svelte'
	import { classNames, handleA11yClick, getMediaType } from 'syw-common/helpers'
    import Image from './Image.svelte';
    import Video from './Video.svelte';

	const {
		src
	} = getContext('dataStoreContext')
	const {
		hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance
	} = getContext('uiStoreContext')

	const mediaType = $derived(getMediaType($src))

	const isClickableElem = (event) =>
		["IMG", "VIDEO"].includes(event.target.tagName)

	const handleClick = (event) => {
		if(!isClickableElem(event)) return
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

	const handleMouseEnter = (event) => {
		hoverImage(event)
	}

	const handleMouseLeave = (event) => {
		unhoverImage(event)
	}

	const handleKeyDown = event => {
		if(!isClickableElem(event)) return
		if($isProvenanceOpen) {
			handleA11yClick(event, closeProvenance)
		} else {
			handleA11yClick(event, openProvenance)
		}
	}

</script>

<div
	role="button"
	tabindex="0"
	onclick={handleClick}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onkeydown={handleKeyDown}
	class={classNames('Media')}
>
	{#if mediaType === "image"}
		<Image />
	{/if}
	{#if mediaType === "video"}
		<Video />
	{/if}
</div>