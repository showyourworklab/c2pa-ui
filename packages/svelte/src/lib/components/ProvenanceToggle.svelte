<script>
	import { getContext } from 'svelte';
	import styles from 'syw-common/css/ProvenanceToggle.module.css'

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
	class={styles.ProvenanceToggle}
	onclick={handleClick}
>
	{$isProvenanceOpen ? getText($locale, 'toggle', 'provenance') : getText($locale, 'toggle', 'provenance')}
</button>