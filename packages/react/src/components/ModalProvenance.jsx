import React from 'react'

import styles from '$common/css/ModalProvenance.module.scss'
import { useUiContext } from '$src/context'
import Modal from './Modal'
import Provenance from './Provenance'
import Explainer from './Explainer'
import ToggleExplainer from './ToggleExplainer'

const ModalProvenance = () => {
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
			onOpenChange={handleOpenChange}
			className={styles.ModalProvenance}
		>
			<div
				className={styles.ModalProvenanceExplainer}
			>
				{!isOpenExplainer ? <ToggleExplainer /> : null}
				<Explainer />
			</div>
			<Provenance />
		</Modal>
	)
}

export default ModalProvenance