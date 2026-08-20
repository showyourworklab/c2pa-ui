<script lang="ts">
	import { classNames, handleA11yClick, getMediaType } from 'syw-common/helpers'
    import Image from './Image.svelte';
    import Video from './Video.svelte';
	import { getDataContext } from '../store/data.js'
	import { getUiContext } from '../store/ui.js'

	const {
		src
	} = getDataContext()
	const {
		hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance
	} = getUiContext()

	const mediaType = $derived(getMediaType($src))

	const isClickableElem = (event: Event) =>
		["IMG", "VIDEO"].includes((event.target as HTMLElement)?.tagName)

	const handleClick = (event: MouseEvent) => {
		if(!isClickableElem(event)) return
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

	const handleMouseEnter = (event: MouseEvent) => {
		hoverImage(event)
	}

	const handleMouseLeave = (event: MouseEvent) => {
		unhoverImage(event)
	}

	const handleKeyDown = (event: KeyboardEvent) => {
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
