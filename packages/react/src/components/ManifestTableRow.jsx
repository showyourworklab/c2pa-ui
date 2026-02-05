import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'

function ManifestTableRow({ type, value }) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return value.map(v => v.name).join(', ')
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
			className={classNames('ManifestTableRow')}
		>
			<div
				className={classNames('ManifestTableRowLabel')}
			>
				{getText(type)}
			</div>
			<div
				className={classNames('ManifestTableRowValue')}
			>
				{formattedValue}
			</div>
		</li>
	)
}

export default ManifestTableRow