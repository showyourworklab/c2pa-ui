<script>
	import { getContext } from 'svelte';
	import styles from '@syw/common/css/ToggleExplainer.module.scss'

	const { locale, getText } = getContext('i18nStoreContext');
	const { isExplainerOpen, openExplainer, closeExplainer } = getContext('uiStoreContext');

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