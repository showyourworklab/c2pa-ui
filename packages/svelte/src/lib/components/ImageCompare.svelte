<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/ImageCompare.module.css'
	const {
		compareImage,
		comparePosition
	} = getContext('uiStoreContext')
</script>

<div
	class={styles.ImageCompare}
	style={`left:${$comparePosition?.clientX}px;top:${$comparePosition?.clientY}px`}
>
	<img
		src={$compareImage}
		alt={""}
		class={styles.ImageCompareImg}
	/>
</div>