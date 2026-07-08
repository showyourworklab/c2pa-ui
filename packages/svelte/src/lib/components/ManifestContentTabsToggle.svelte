<script>
    import { getContext } from 'svelte';
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getAvailableTabs } from 'syw-common/helpers'

	const {
		keys = [],
		manifest = {},
		class: className
	} = $props()

	const { locale, getText } = getContext('i18nStoreContext')

	const availableTabs = $derived(() =>
		getAvailableTabs(keys, manifest)
	)

</script>

<div
	class={classNames(
		'ManifestContentTabsToggle',
		className
	)}
>
	<Tabs.List
		class={classNames('ManifestContentTabsToggleList')}
	>
		{#each keys as key}
			<Tabs.Trigger
				value={key}
				disabled={!availableTabs().includes(key)}
				class={classNames('ManifestContentTabsToggleTrigger')}
			>
				{getText($locale, "tab", key)}
			</Tabs.Trigger>
		{/each}
		<Tabs.Indicator
			class={classNames('ManifestContentTabsToggleListIndicator')}
		/>
	</Tabs.List>
</div>