import { classNames } from 'syw-common/helpers'
import { MANIFEST_KEYS } from 'syw-common/constants'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ manifest }) {

	return (
		<ul
			className={classNames('ManifestTable')}
		>
			{MANIFEST_KEYS.map(key =>
				manifest[key] ?
					<ManifestTableRow
						key={key}
						type={key}
						value={manifest[key]}
						manifest={manifest}
					/>
				: null
			)}
		</ul>
	)
}

export default ManifestTable