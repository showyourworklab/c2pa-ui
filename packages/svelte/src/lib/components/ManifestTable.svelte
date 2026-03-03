<script>
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_KEYS } from 'syw-common/constants'
	import ManifestTableRow from './ManifestTableRow.svelte'

	const {
		manifest = {}
	} = $props()
</script>

<ul
	class={classNames('ManifestTable')}
>
	{#each MANIFEST_KEYS as key}
		{#if manifest[key]}
			<ManifestTableRow
				type={key}
				value={manifest[key]}
				manifest={manifest}
			/>
		{/if}
	{/each}
</ul>