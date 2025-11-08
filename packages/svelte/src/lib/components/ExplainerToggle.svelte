<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/ExplainerToggle.module.css'

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
	class={styles.ExplainerToggle}
	onclick={handleClick}
>
	{getText($locale, 'toggle', 'explain')}
</button>