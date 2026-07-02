<script>
	import { getContext } from 'svelte';
    import { Tabs, useTabs } from '@ark-ui/svelte/tabs';
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_CONTENT_TAB_DEFAULT, MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants'
	import Collapse from './Collapse.svelte'
	import ManifestPreview from './ManifestPreview.svelte'
    import ManifestContent from './ManifestContent.svelte';
	
	const { openManifests } = getContext('uiStoreContext');

	const {
		manifest = {}
	} = $props()

	const open = $derived(manifest.id in $openManifests)

	const tabs = useTabs({
		defaultValue: MANIFEST_CONTENT_TAB_DEFAULT
	})
	const tabKeys = $derived(MANIFEST_CONTENT_TAB_KEYS[manifest?.type?.key] ?? [])

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
		class={classNames('ManifestInner')}
	>
		<Tabs.RootProvider
			value={tabs}
			keys={tabKeys}
		>
			<ManifestPreview
				open={open}
				manifest={manifest}
				tabKeys={tabKeys}
			/>
			<Collapse
				open={open}
			>
				<ManifestContent
					manifest={manifest}
					tabKeys={tabKeys}
				/>
			</Collapse>
		</Tabs.RootProvider>
	</div>
</li>