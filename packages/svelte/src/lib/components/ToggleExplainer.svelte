<script>
	import styles from 'syw-common/css/ToggleExplainer.module.scss'
	import { locale, getText } from '$lib/store/i18n.js'
	import { isExplainerOpen, openExplainer, closeExplainer } from '$lib/store/ui.js'

	const handleClick = (event) => {
		if($isExplainerOpen) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
	}
</script>

<button
	aria-pressed={$isExplainerOpen}
	class={styles.ToggleExplainer}
	on:click={handleClick}
>
	{getText($locale, 'toggle', 'explain')}
</button>