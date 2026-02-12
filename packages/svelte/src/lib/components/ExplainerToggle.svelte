<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

	const { locale, getText } = getContext('i18nStoreContext');
	const { variant, isExplainerOpen, openExplainer, closeExplainer, openProvenance } = getContext('uiStoreContext');

	const handleClick = (event) => {
		// Toggle explainer based on current state
		if($isExplainerOpen) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
		// If modal, also open provenance modal to view explainer
		if($variant === "modal") {
			openProvenance(event)
		}
	}
</script>

<button
	aria-pressed={$isExplainerOpen}
	class={classNames('ExplainerToggle')}
	onclick={handleClick}
>
	{getText($locale, 'explainer', 'toggle')}
</button>