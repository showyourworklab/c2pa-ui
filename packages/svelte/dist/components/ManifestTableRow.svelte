<script>
	import styles from '../../../../common/css/Manifest.module.scss'
	import { locale, getText } from '../store/i18n'

	export let type
	export let value
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
		{value ?? ''}
	</div>
</li>