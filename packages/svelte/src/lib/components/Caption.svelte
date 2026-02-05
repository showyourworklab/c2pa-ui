<script>
	import { getContext } from 'svelte';
	// import styles from 'syw-common/css/Caption.module.css'
	const { caption, byline } = getContext('dataStoreContext');
</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y_figcaption_parent -->
	<figcaption
		class='Caption'
	>
		<div
			class='CaptionInner'
		>
			{$caption}&nbsp;
			<em
				class='CaptionByline'
			>
				{$byline}
			</em>
		</div>
	</figcaption>
{/if}