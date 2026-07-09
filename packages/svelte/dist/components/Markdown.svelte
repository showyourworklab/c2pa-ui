<script>
	import { classNames } from 'syw-common/helpers'
	import { convertMarkupToSafeHtml } from 'syw-common/helpers/markdown'

	const {
		content,
		tag = 'div',
		class: className,
	} = $props()

	const html = $derived(convertMarkupToSafeHtml(content))
</script>

{#if html}
	<svelte:element
		this={tag}
		class={classNames('Markdown', className)}
	>
		{@html html}
	</svelte:element>
{/if}
