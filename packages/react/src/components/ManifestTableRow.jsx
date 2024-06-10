import { useEffect, useRef, useState } from 'react'
import { selectProducer, generateVerifyUrl } from 'c2pa'
import { useThumbnailUrl } from '@contentauth/react'

import styles from '$common/css/Manifest.module.scss'
import { useI18nContext } from '$src/context/i18n'

function ManifestTableRow({ type, value }) {
	const { getText } = useI18nContext()
	return (
		<li
			className={styles.ManifestTableRow}
		>
			<div
				className={styles.ManifestTableRowLabel}
			>
				{getText(type)}
			</div>
			<div
				className={styles.ManifestTableRowValue}
			>
				{value}
			</div>
		</li>
	)
}

export default ManifestTableRow