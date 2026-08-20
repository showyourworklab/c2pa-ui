import { classNames } from 'syw-common/helpers'
import type { ManifestTableProps } from 'syw-common/types/components'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ keys = [], manifest }: ManifestTableProps) {
	return (
		<ul
			className={classNames('ManifestTable')}
		>
			{keys.map(key =>
				<ManifestTableRow
					key={key}
					type={key}
					value={manifest[key]}
				/>
			)}
		</ul>
	)
}

export default ManifestTable