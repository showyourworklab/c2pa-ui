<script>
	import styles from '../../../../common/css/Image.module.scss'
	import { handleA11yClick } from '../../../../common/helpers'
	import { src, alt } from '../store/data.js'
	import { hoverImage, unhoverImage, toggleProvenance } from '../store/ui.js'

	const handleClick = () => {
		toggleProvenance()
	}

	const handleMouseEnter = () => {
		hoverImage()
	}

	const handleMouseLeave = () => {
		unhoverImage()
	}

	const handleKeyDown = e => {
		handleA11yClick(e, toggleProvenance)
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