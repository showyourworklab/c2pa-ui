<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

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
	class={classNames('ExplainerToggle')}
	onclick={handleClick}
>
	{getText($locale, 'toggle', 'explain')}
</button>