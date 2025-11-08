<script>
	import styles from 'syw-common/css/Manifest.module.css'
	import { MANIFEST_KEYS } from 'syw-common/constants'
	import ManifestTableRow from './ManifestTableRow.svelte'

	const {
		manifest = {}
	} = $props()
</script>

<ul
	class={styles.ManifestTable}
>
	{#each MANIFEST_KEYS as key}
		{#if manifest[key]}
			<ManifestTableRow
				type={key}
				value={manifest[key]}
			/>
		{/if}
	{/each}
</ul>