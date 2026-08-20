<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
	import type { ManifestContentProps } from 'syw-common/types/components'
	import ManifestTable from './ManifestTable.svelte'
	import ManifestContentTabs from './ManifestContentTabs.svelte'
	import ManifestContentTabsToggle from './ManifestContentTabsToggle.svelte'

	const {
		tabKeys = [],
		manifest,
	}: ManifestContentProps = $props()
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
		<ManifestContentTabsToggle
			keys={tabKeys}
			manifest={manifest}
			class={classNames('ManifestContentSecondaryTabsToggle')}
		/>
		<ManifestContentTabs
			keys={tabKeys}
			manifest={manifest}
		/>
	</div>
</div>
