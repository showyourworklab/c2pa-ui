<script>
    import { getContext } from 'svelte';
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames, getObjectValue } from 'syw-common/helpers'

	const {
		keys = [],
		manifest = {},
		class: className
	} = $props()

	const { locale, getText } = getContext('i18nStoreContext')

	const disabledTabKeys = $derived(() =>
		keys?.filter(key => {
			const value = getObjectValue(key, manifest)
			if(key === "location") {
				return !value
			} else if(key === "actions") {
				return !value?.length
			} else {
				return false
			}
		})
	);

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
				disabled={disabledTabKeys().includes(key)}
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