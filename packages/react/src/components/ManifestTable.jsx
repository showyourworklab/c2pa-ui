import { classNames } from 'syw-common/helpers'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ keys = [], manifest }) {
	return (
		<ul
			className={classNames('ManifestTable')}
		>
			{keys.map(key =>
				<ManifestTableRow
					key={key}
					type={key}
					value={manifest[key]}
					manifest={manifest}
				/>
			)}
		</ul>
	)
}

export default ManifestTable