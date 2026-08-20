<script lang="ts">
	import type { Snippet } from 'svelte'
	import { classNames } from 'syw-common/helpers'

	const { children }: { children: Snippet } = $props()
</script>

<figure
	class={classNames('Figure')}
>
	{@render children()}
</figure>
