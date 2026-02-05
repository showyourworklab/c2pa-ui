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
					/>
				: null
			)}
			{/* {manifest?.verifyUrl ?
				<li>
					<a
						href={manifest?.verifyUrl}
						target='_blank'
					>
						View Content Credentials
					</a>
				</li>
			: null} */}
		</ul>
	)
}

export default ManifestTable