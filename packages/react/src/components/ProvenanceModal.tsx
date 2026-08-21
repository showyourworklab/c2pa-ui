import { classNames } from 'syw-common/helpers'
import { useI18nContext, useUiContext } from '$src/context'
import Modal from './Modal'
import Provenance from './Provenance'

const ProvenanceModal = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = useUiContext()
	const { getText } = useI18nContext()

	const handleOpenChange = (newOpen: boolean) => {
		if(newOpen) {
			openProvenance()
		} else {
			closeProvenance()
			closeExplainer()
		}
	}

	return (
		<Modal
			open={isProvenanceOpen}
			title={getText("provenance", "toggle") ?? undefined}
			onOpenChange={handleOpenChange}
			className={classNames('ProvenanceModal')}
		>
			<Provenance />
		</Modal>
	)
}

export default ProvenanceModal