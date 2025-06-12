<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/Manifest.module.scss'
	import { joinClassNames } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
	import ManifestTable from './ManifestTable.svelte'

	const { openManifests } = getContext('uiStoreContext');

	export let manifest

	$: open = manifest.id in $openManifests

	$: classes = joinClassNames(
		styles.Manifest,
		open ? styles.Manifest_open : false,
	)

</script>

<li
	class={classes}
>
	<div
		class={styles.ManifestRow}
	>
		<ManifestPreview
			open={open}
			manifest={manifest}
		/>
		<Collapse
			open={open}
		>
			<div
				class={styles.ManifestContent}
			>
				<ManifestTable
					manifest={manifest}
				/>
			</div>
		</Collapse>
	</div>
</li>