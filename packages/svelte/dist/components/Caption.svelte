<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Markdown from './Markdown.svelte';
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
			<Markdown
				content={$caption}
			/>
			<div
				class={classNames('CaptionByline')}
			>
				{$byline}
			</div>
		</div>
	</figcaption>
{/if}