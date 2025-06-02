import React from 'react'
import styles from '@syw/common/css/ToggleProvenance.module.scss'
import { useUiContext, useI18nContext } from '$src/context'

const ToggleProvenance = () => {
	const {
		isOpenProvenance,
		openProvenance,
		closeProvenance
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = event => isOpenProvenance
		? closeProvenance(event)
		: openProvenance(event)

	return (
		<button
			aria-pressed={isOpenProvenance}
			className={styles.ToggleProvenance}
			onClick={onClick}
		>
			{isOpenProvenance ? getText('toggle', 'provenance') : getText('toggle', 'provenance')}
		</button>
	)
}

export default ToggleProvenance