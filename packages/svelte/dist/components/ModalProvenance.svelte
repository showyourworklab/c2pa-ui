<script>
	import { onMount, getContext } from 'svelte'
	import styles from 'syw-common/css/ModalProvenance.module.css'
	import Modal from './Modal.svelte'
	import Provenance from './Provenance.svelte'
	import Explainer from './Explainer.svelte'
	import ToggleExplainer from './ToggleExplainer.svelte'
	
	// const { locale, getText } = getContext('i18nStoreContext');
	const {
		isExplainerOpen,
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getContext('uiStoreContext')

	const handleOpenChange = (newOpen, event) => {
		const originalEvent = event
		if(newOpen) {
			openProvenance(originalEvent)
		} else {
			closeProvenance(originalEvent)
			closeExplainer(originalEvent)
		}
	}

</script>

<Modal
	open={$isProvenanceOpen}
	title="Image Origin"
	description="Explore the provenance of this image"
	onOpenChange={handleOpenChange}
	className={styles.ModalProvenance}
>
	<div
		class={styles.ModalProvenanceExplainer}
	>
		{#if $isExplainerOpen}
			<ToggleExplainer />
		{/if}
		<Explainer />
	</div>
	<Provenance />
</Modal>