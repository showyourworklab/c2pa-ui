<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { convertMarkupToSafeHtml } from 'syw-common/helpers/markdown'
	import type { MarkdownProps } from 'syw-common/types/components'

	const {
		content,
		tag = 'div',
		class: className,
	}: Pick<MarkdownProps, 'content'> & { tag?: string, class?: string | null } = $props()

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
