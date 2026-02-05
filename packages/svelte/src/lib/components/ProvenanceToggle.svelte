<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

	const { locale, getText } = getContext('i18nStoreContext');
	const { isProvenanceOpen, openProvenance, closeProvenance } = getContext('uiStoreContext');

	const handleClick = (event) => {
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

</script>

<button
	aria-pressed={true}
	class={classNames('ProvenanceToggle')}
	onclick={handleClick}
>
	{$isProvenanceOpen ? getText($locale, 'toggle', 'provenance') : getText($locale, 'toggle', 'provenance')}
</button>