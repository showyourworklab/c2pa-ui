import { useMemo } from 'react'
import { classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import type { ManifestGeneratorEntry, ManifestLocation, ManifestTimestamp } from 'syw-common/types/c2pa'
import type { ManifestTableRowProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Map from './Map'
import Actions from './Actions'
import Generator from './Generator'

function ManifestTableRow({ type, value, manifest }: ManifestTableRowProps) {
	const { locale, getText } = useI18nContext()

	const formattedValue = useMemo(() => {
		switch(type) {
			case 'producer':
				return (value as { name?: string }[] | undefined)?.map(v => v.name).join(', ')
			case 'timestamp':
				return getDateString(locale ?? '', (value as ManifestTimestamp | null) ?? undefined)
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
						location={value as ManifestLocation}
					/>
				: type === 'actions' ?
					<Actions
						actions={value as string[]}
					/>
				: type === 'generator' ?
					(value as ManifestGeneratorEntry[]).map((v, index) =>
						<Generator
							key={index}
							name={v.name}
							icon={v.icon}
						/>
					)
				: formattedValue as string}
			</div>
		</li>
	)
}

export default ManifestTableRow