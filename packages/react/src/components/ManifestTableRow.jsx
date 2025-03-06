import styles from '$common/css/Manifest.module.scss'
import { useI18nContext } from '$src/context/i18n'
import { getDateString } from '$common/helpers/i18n'
import { useMemo } from 'react'

function ManifestTableRow({ type, value }) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return value.name
			case 'timestamp':
				return getDateString(locale, value)
			default:
				return value
		}
	}, [type, value]);

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
				{formattedValue}
			</div>
		</li>
	)
}

export default ManifestTableRow