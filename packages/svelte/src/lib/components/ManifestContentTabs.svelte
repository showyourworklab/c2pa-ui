<script>
	import { Tabs } from '@ark-ui/svelte/tabs'
	import { classNames } from 'syw-common/helpers'
	import Map from './Map.svelte'
	import Actions from './Actions.svelte'

	const {
		manifest = {},
		keys = [],
	} = $props()

</script>

<div
	class={classNames('ManifestContentTabs')}
>
	{#each keys as key}
		<Tabs.Content
			value={key}
			class={classNames(
				'ManifestContentTabsContent',
				`ManifestContentTabsContent_${key}`
			)}
		>
			<div
				class={classNames('ManifestContentTabsContentInner')}
			>
				{#if key === "thumbnail"}
					<div
						class={classNames('ManifestContentTabsThumbnail')}
					>
						<img
							alt=''
							src={manifest?.thumbnail}
							class={classNames('ManifestContentTabsThumbnailImage')}
						/>
					</div>
				{:else if key === "location"}
					<Map
						location={manifest?.location}
					/>
				{:else if key === "actions"}
					<Actions
						actions={manifest?.actions}
					/>
				{/if}
			</div>
		</Tabs.Content>
	{/each}
</div>