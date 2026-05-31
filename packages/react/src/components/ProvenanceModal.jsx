import { classNames } from 'syw-common/helpers'
import { useI18nContext, useUiContext, useDataContext } from '$src/context'
import Modal from './Modal'
import Badge from './Badge'
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
	const { status, types } = useDataContext()

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
				<Badge
					status={status}
					type={types[0]}
				/>
			</div>
			<Explainer />
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal