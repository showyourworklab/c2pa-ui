<script>
	import { classNames } from 'syw-common/helpers'
	import ManifestTableRow from './ManifestTableRow.svelte'

	const {
		keys = [],
		manifest = {}
	} = $props()
</script>

<ul
	class={classNames('ManifestTable')}
>
	{#each keys as key}
		{#if manifest[key]}
			<ManifestTableRow
				type={key}
				value={manifest[key]}
				manifest={manifest}
			/>
		{/if}
	{/each}
</ul>