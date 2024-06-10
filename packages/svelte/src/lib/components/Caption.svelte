<script>
	import styles from '$common/css/Caption.module.scss'
	import { caption, byline } from '$lib/store/data.js'

</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y-structure -->
	<figcaption
		class={styles.Caption}
	>
		<div
			class={styles.CaptionInner}
		>
			{$caption}&nbsp;
			<em
				class={styles.CaptionByline}
			>
				{$byline}
			</em>
		</div>
	</figcaption>
{/if}