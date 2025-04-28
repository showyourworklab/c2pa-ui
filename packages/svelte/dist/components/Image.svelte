<script>
	import styles from 'syw-common/css/Image.module.scss'
	import { handleA11yClick } from 'syw-common/helpers'
	import { src, alt } from '../store/data.js'
	import { hoverImage, unhoverImage, isProvenanceOpen, openProvenance, closeProvenance } from '../store/ui.js'

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