import React from 'react'

import styles from '$common/css/Cutline.module.scss'
import CutlineCaption from './Caption'
import ToggleProvenance from './ToggleProvenance'
import ToggleExplainer from './ToggleExplainer'

const Cutline = ({
	caption,
	byline
}) => {
	return (
		<div
			className={styles.Cutline}
		>
			<div
				className={styles.CutlineToggles}
			>
				<ToggleProvenance />
				<ToggleExplainer />
			</div>
		</div>
	)
}

export default Cutline