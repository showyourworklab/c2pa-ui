<script>
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
	import ManifestTable from './ManifestTable.svelte'
	import ManifestContentTabs from './ManifestContentTabs.svelte'

	const {
		tabKeys = [],
		manifest = {},
	} = $props()
</script>

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
		<!-- <ManifestTable
			keys={MANIFEST_SECONDARY_KEYS}
			manifest={manifest}
		/> -->
		<ManifestContentTabs
			keys={tabKeys}
			manifest={manifest}
		/>
	</div>
</div>