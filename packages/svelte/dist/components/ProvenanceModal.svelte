<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
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

	const {
		locale,
		getText
	} = getContext('i18nStoreContext')

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
	title={$isProvenanceOpen ? getText($locale, 'provenance', 'toggle') : getText($locale, 'provenance', 'toggle')}
	onOpenChange={handleOpenChange}
	className='ProvenanceModal'
>
	<div
		class={classNames('ProvenanceModalExplainer')}
	>
		{#if !$isExplainerOpen}
			<ExplainerToggle />
		{/if}
		<Explainer />
	</div>
	<Provenance />
</Modal>