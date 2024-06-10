import React from 'react'

import styles from '$common/css/ToggleProvenance.module.scss'
import { useUiContext, useI18nContext } from '$src/context'

const ToggleProvenance = () => {
	const {
		isShowProvenance,
		toggleProvenance,
	} = useUiContext()
	const { locale, getText } = useI18nContext()

	const onClick = toggleProvenance

	return (
		<button
			aria-pressed={isShowProvenance}
			className={styles.ToggleProvenance}
			onClick={onClick}
		>
			{isShowProvenance ? getText('toggle', 'provenance') : getText('toggle', 'provenance')}
		</button>
	)
}

export default ToggleProvenance