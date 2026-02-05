<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	const { caption, byline } = getContext('dataStoreContext');
</script>

{#if $caption || $byline}
	<!-- svelte-ignore a11y_figcaption_parent -->
	<figcaption
		class={classNames('Caption')}
	>
		<div
			class={classNames('CaptionInner')}
		>
			{$caption}&nbsp;
			<em
				class={classNames('CaptionByline')}
			>
				{$byline}
			</em>
		</div>
	</figcaption>
{/if}