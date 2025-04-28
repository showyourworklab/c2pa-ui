<script>
	import styles from 'syw-common/css/Manifest.module.scss'
	import { locale, getText } from '$lib/store/i18n'
	import { getDateString } from 'syw-common/helpers/i18n'

	export let type
	export let value

	let formattedValue
	$: {
		switch(type) {
			case "producer":
				formattedValue = value?.name
				break
			case "timestamp":
				formattedValue = getDateString($locale, value)
				break
			default:
				formattedValue = value
		}
	}

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
		{formattedValue}
	</div>
</li>