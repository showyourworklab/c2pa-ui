<script>
	import { getContext } from 'svelte';
	import styles from '../common/css/Image.module.css'
	import { handleA11yClick } from '../common/helpers'

	const { src, alt } = getContext('dataStoreContext');
	const { hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance } = getContext('uiStoreContext');

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
	class={styles.Image}
	role="button"
	tabindex="0"
	on:click={handleClick}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:keydown={handleKeyDown}
>
	<img
		src={$src}
		alt={$alt}
		class={styles.ImageImg}
	/>
</div>