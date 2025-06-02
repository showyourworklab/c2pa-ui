<script>
	import styles from '@syw/common/css/Manifest.module.scss'
	import { MANIFEST_KEYS } from '@syw/common/constants'
	import ManifestTableRow from './ManifestTableRow.svelte'

	export let manifest
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