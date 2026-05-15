import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'
import Map from './Map'

function ManifestTableRow({ type, value, manifest }) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return value?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString(locale, value?.value)
			default:
				return value?.value || value
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
				{type === 'location' ?
					<Map
						location={value}
					/>
				: type === 'generator' ?
					<div>
						{formattedValue}
						<div
							className={classNames('ManifestTableRowValueSub')}
						>
							{getText('actions', 'count')?.replace('{count}', value?.length)}
						</div>
					</div>
				: formattedValue}
			</div>
		</li>
	)
}

export default ManifestTableRow