<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
	import { handleA11yClick } from 'syw-common/helpers'

	const { src, alt } = getContext('dataStoreContext')
	const {
		hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance
	} = getContext('uiStoreContext')

	const handleClick = (event) => {
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
		if($isProvenanceOpen) {
			handleA11yClick(event, closeProvenance)
		} else {
			handleA11yClick(event, openProvenance)
		}
	}

</script>

<div
	class={classNames('Image')}
	role="button"
	tabindex="0"
	onclick={handleClick}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onkeydown={handleKeyDown}
>
	<img
		src={$src}
		alt={$alt}
		class={classNames('ImageImg')}
	/>
</div>