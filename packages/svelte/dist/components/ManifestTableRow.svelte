<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { getDateString } from 'syw-common/helpers/i18n'
    import Map from './Map.svelte'
	import Actions from './Actions.svelte'
	import Generator from './Generator.svelte'

	const { locale, getText } = getContext('i18nStoreContext');

	const {
		type,
		value,
	} = $props()

	const formattedValue = $derived(() => {
		switch(type) {
			case 'producer':
				return value?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString($locale, value)
			default:
				return value
		}
	})

</script>

{#if formattedValue() !== null && formattedValue() !== undefined && formattedValue() !== ""}
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
			{:else if type === 'actions'}
				<Actions
					actions={value}
				/>
			{:else if type === 'generator'}
				{#each value as v}
					<Generator
						name={v.name}
						icon={v.icon}
					/>
				{/each}
			{:else}
				{formattedValue()}
			{/if}
		</div>
	</li>
{/if}