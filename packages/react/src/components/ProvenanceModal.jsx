import { classNames } from 'syw-common/helpers'
import { useI18nContext, useUiContext, useDataContext } from '$src/context'
import Modal from './Modal'
import Provenance from './Provenance'
import Explainer from './Explainer'
import ExplainerToggle from './ExplainerToggle'

const ProvenanceModal = () => {
	const {
		isExplainerOpen,
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const { getText } = useI18nContext()

	const handleOpenChange = (newOpen, event) => {
		const originalEvent = event
		if(newOpen) {
			openProvenance(originalEvent)
		} else {
			closeProvenance(originalEvent)
			closeExplainer(originalEvent)
		}
	}

	return (
		<Modal
			open={isProvenanceOpen}
			title={getText("provenance", "toggle")}
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceModal')}
		>
			<div
				className={classNames('ProvenanceModalToolbar')}
			>
				<ExplainerToggle />
			</div>
			<Explainer />
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal