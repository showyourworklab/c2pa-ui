<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import Modal from './Modal.svelte'
	import Provenance from './Provenance.svelte'
	import Explainer from './Explainer.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
	import { getI18nContext } from '../store/i18n.js'
	import { getUiContext } from '../store/ui.js'

	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getUiContext()
	const { locale, getText } = getI18nContext()

	const handleOpenChange = (newOpen: boolean) => {
		if(newOpen) {
			openProvenance()
		} else {
			closeProvenance()
			closeExplainer()
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
		class={classNames('ProvenanceModalToolbar')}
	>
		<ExplainerToggle />
	</div>
	<Explainer />
	<Provenance />
</Modal>
