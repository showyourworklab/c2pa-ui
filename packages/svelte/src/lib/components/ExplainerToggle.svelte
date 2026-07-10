<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '$lib/store/i18n.js'

	const { locale, getText } = getI18nContext();
	const { variant, isExplainerOpen, openExplainer, closeExplainer, openProvenance } = getContext('uiStoreContext');

	const { class: className } = $props()

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
	class={classNames('ExplainerToggle', className)}
	onclick={handleClick}
>
	{getText($locale, 'explainer', 'toggle')}
</button>