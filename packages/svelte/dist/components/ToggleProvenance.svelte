<script>
	import styles from '@syw/common/css/ToggleProvenance.module.scss'
	import { locale, getText } from '../store/i18n.js'
	import { isProvenanceOpen, openProvenance, closeProvenance } from '../store/ui.js'

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