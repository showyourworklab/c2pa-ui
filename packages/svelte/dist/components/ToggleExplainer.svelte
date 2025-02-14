<script>
	import styles from '../../../../common/css/ToggleExplainer.module.scss'
	import { locale, getText } from '../store/i18n.js'
	import { isShowExplainer, toggleExplainer } from '../store/ui.js'

	const handleClick = () => {
		toggleExplainer()
	}
</script>

<button
	aria-pressed={$isShowExplainer}
	class={styles.ToggleExplainer}
	on:click={handleClick}
>
	{getText($locale, 'toggle', 'explain')}
</button>