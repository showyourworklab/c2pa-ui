<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/Manifest.module.css'
	import { getDateString } from 'syw-common/helpers/i18n'
    import Map from './Map.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

	const {
		type,
		value
	} = $props()

	const formattedValue = $derived(() => {
		switch(type) {
			case "producer":
				return value?.map(v => v.name)?.join(', ')
			case "timestamp":
				return getDateString($locale, value)
			default:
				return value
		}
	})
	console.log(value)
</script>

<li
	class={styles.ManifestTableRow}
>
	<div
		class={styles.ManifestTableRowLabel}
	>
		{type ? getText($locale, type) : ''}
	</div>
	<div
		class={styles.ManifestTableRowValue}
	>
		{#if type === 'location'}
			<Map
				location={value}
			/>
		{:else}
			{formattedValue()}
		{/if}
	</div>
</li>