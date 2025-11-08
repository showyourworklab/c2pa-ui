<script>
	import styles from 'syw-common/css/Cutline.module.css'
	import ProvenanceToggle from './ProvenanceToggle.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
</script>

<div
	class={styles.Cutline}
>
	<div
		class={styles.CutlineToggles}
	>
		<ProvenanceToggle />
		<ExplainerToggle />
	</div>
</div>