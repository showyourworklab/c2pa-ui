<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
	import ManifestTable from './ManifestTable.svelte'

	const { openManifests } = getContext('uiStoreContext');

	const {
		manifest = {}
	} = $props()

	const open = $derived(manifest.id in $openManifests)

	const classes = $derived(
		classNames(
			'Manifest',
			open ? 'Manifest_open' : false,
		)
	)

</script>

<li
	class={classes}
>
	<div
		class={classNames(
			'ManifestRow',
			open ? 'ManifestRow_open' : null
		)}
	>
		<ManifestPreview
			open={open}
			manifest={manifest}
		/>
		<Collapse
			open={open}
		>
			<div
				class={classNames('ManifestContent')}
			>
				<ManifestTable
					manifest={manifest}
				/>
			</div>
		</Collapse>
	</div>
</li>