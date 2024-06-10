<script>
	import styles from '../../../../common/css/ToggleExplainer.module.scss'
	import { locale, getText } from '../store/i18n.js'
	import { toggleExplainer } from '../store/ui.js'

	const handleClick = () => {
		toggleExplainer()
	}

</script>

<button
	aria-pressed={true}
	class={styles.ToggleExplainer}
	on:click={handleClick}
>
	{getText($locale, 'toggle', 'explain')}
</button>