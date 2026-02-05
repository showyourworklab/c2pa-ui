<script>
	import { getContext } from 'svelte'
	// import styles from 'syw-common/css/ProvenanceModal.module.css'
	import Modal from './Modal.svelte'
	import Provenance from './Provenance.svelte'
	import Explainer from './Explainer.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
	
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
	className='ProvenanceModal'
>
	<div
		class='ProvenanceModalExplainer'
	>
		{#if $isExplainerOpen}
			<ExplainerToggle />
		{/if}
		<Explainer />
	</div>
	<Provenance />
</Modal>