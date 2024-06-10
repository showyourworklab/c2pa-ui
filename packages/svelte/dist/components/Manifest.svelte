<script>
	import styles from '../../../../common/css/Manifest.module.scss'
	import { joinClassNames } from '../../../../common/helpers'
	import { activeManifests } from '../store/ui.js'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
	import ManifestTable from './ManifestTable.svelte'

	export let index
	export let manifest

	$: open = $activeManifests?.includes(index)

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
			index={index}
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