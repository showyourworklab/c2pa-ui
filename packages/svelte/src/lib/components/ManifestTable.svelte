<script>
	import styles from '$common/css/Manifest.module.scss'
	import { MANIFEST_KEYS } from '$common/constants'
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
	<!-- {manifest?.verifyUrl ?
		<li>
			<a
				href={manifest?.verifyUrl}
				target='_blank'
			>
				View Content Credentials
			</a>
		</li>
	: null} -->
</ul>