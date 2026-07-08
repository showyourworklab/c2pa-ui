import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'
import Map from './Map'
import Actions from './Actions'

function ManifestTableRow({ type, value, manifest }) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return value?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString(locale, value)
			default:
				return value
		}
	}, [type, value]);

	if(formattedValue === null || formattedValue === undefined || formattedValue === "") return

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
				: type === 'actions' ?
					<Actions
						actions={value}
					/>
				: type === 'generator' ?
					value.map((v, index) =>
						<div
							key={index}
							className={classNames('ManifestTableRowValueGenerator')}
						>
							{v.icon ?
								<img
									src={v.icon}
									className={classNames('ManifestTableRowValueGeneratorIcon')}
								/>
							: null}
							<span>
								{v.name}
							</span>
							{/* {v.detail ?
								<sub>
									{v.detail}
								</sub>
							: null} */}
						</div>
					)
				: formattedValue}
			</div>
		</li>
	)
}

export default ManifestTableRow