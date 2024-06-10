import React from 'react'

import styles from '$common/css/ToggleExplainer.module.scss'
import { useUiContext, useI18nContext } from '$src/context'

const ToggleExplainer = () => {
	const {
		isShowExplainer,
		toggleExplainer,
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = toggleExplainer

	return (
		<button
			aria-pressed={isShowExplainer}
			className={styles.ToggleExplainer}
			onClick={onClick}
		>
			{getText('toggle', 'explain')}
		</button>
	)
}

export default ToggleExplainer