<script>
	import { getContext } from 'svelte';
	import styles from '../common/css/ToggleProvenance.module.css'

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
	class={styles.ToggleProvenance}
	on:click={handleClick}
>
	{$isProvenanceOpen ? getText($locale, 'toggle', 'provenance') : getText($locale, 'toggle', 'provenance')}
</button>