<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { getDateString } from 'syw-common/helpers/i18n'
    import Map from './Map.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

	const {
		type,
		value,
		manifest
	} = $props()

	const formattedValue = $derived(() => {
		switch(type) {
			case 'producer':
				return value?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString($locale, value?.value)
			default:
				return value?.value || value
		}
	})

</script>

<li
	class={classNames('ManifestTableRow')}
>
	<div
		class={classNames('ManifestTableRowLabel')}
	>
		{type ? getText($locale, type) : ''}
	</div>
	<div
		class={classNames('ManifestTableRowValue')}
	>
		{#if type === 'location'}
			<Map
				location={value}
			/>
		{:else if type === 'generator'}
			<div>
				{formattedValue()}
				<div
					class={classNames('ManifestTableRowValueSub')}
				>
					{getText($locale, 'actions', 'count')?.replace('{count}', value?.length)}
				</div>
			</div>
		{:else}
			{formattedValue()}
		{/if}
	</div>
</li>