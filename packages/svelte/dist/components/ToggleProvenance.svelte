<script>
	import styles from '../../../../common/css/ToggleProvenance.module.scss'
	import { locale, getText } from '../store/i18n.js'
	import { isShowProvenance, toggleProvenance } from '../store/ui.js'

	const handleClick = () => {
		toggleProvenance()
	}

</script>

<button
	aria-pressed={true}
	class={styles.ToggleProvenance}
	on:click={handleClick}
>
	{$isShowProvenance ? getText($locale, 'toggle', 'provenance') : getText($locale, 'toggle', 'provenance')}
</button>