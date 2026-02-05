import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context'
import Modal from './Modal'
import Provenance from './Provenance'
import Explainer from './Explainer'
import ExplainerToggle from './ExplainerToggle'

const ProvenanceModal = () => {
	const {
		isOpenExplainer,
		isOpenProvenance,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()

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
			open={isOpenProvenance}
			title="Image Origin"
			description="Explore the provenance of this image"
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceModal')}
		>
			<div
				className={classNames('ProvenanceModalExplainer')}
			>
				{!isOpenExplainer ? <ExplainerToggle /> : null}
				<Explainer />
			</div>
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal