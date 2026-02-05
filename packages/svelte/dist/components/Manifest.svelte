<script>
	import { getContext } from 'svelte';
	// import styles from 'syw-common/css/Manifest.module.css'
	import { joinClassNames } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
	import ManifestTable from './ManifestTable.svelte'

	const { openManifests } = getContext('uiStoreContext');

	const {
		manifest = {}
	} = $props()

	const open = $derived(manifest.id in $openManifests)

	const classes = $derived(
		joinClassNames(
			'Manifest',
			open ? 'Manifest_open' : false,
		)
	)

</script>

<li
	class={classes}
>
	<div
		class='ManifestRow'
	>
		<ManifestPreview
			open={open}
			manifest={manifest}
		/>
		<Collapse
			open={open}
		>
			<div
				class='ManifestContent'
			>
				<ManifestTable
					manifest={manifest}
				/>
			</div>
		</Collapse>
	</div>
</li>