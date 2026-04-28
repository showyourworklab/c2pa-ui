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
			{#if $caption && $caption.length}
				{$caption}&nbsp;
			{/if}
			<div
				class={classNames('CaptionByline')}
			>
				{$byline}
			</div>
		</div>
	</figcaption>
{/if}