<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_PRIMARY_KEYS, MANIFEST_SECONDARY_KEYS } from 'syw-common/constants'
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
				<div
					class={classNames('ManifestContentPrimary')}
				>
					<ManifestTable
						keys={MANIFEST_PRIMARY_KEYS}
						manifest={manifest}
					/>
				</div>
				<div
					class={classNames('ManifestContentSecondary')}
				>
					<ManifestTable
						keys={MANIFEST_SECONDARY_KEYS}
						manifest={manifest}
					/>
				</div>
			</div>
		</Collapse>
	</div>
</li>