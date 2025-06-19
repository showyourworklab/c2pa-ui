<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/Caption.module.css'
	const { caption, byline } = getContext('dataStoreContext');
</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y_figcaption_parent -->
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