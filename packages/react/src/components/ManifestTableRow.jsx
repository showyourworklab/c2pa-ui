import { useMemo } from 'react'
import styles from 'syw-common/css/Manifest.module.css'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'

function ManifestTableRow({ type, value }) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return value.name
			case 'timestamp':
				return getDateString(locale, value)
			case 'location':
				return null
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