import { MANIFEST_KEYS } from 'syw-common/constants'
import styles from 'syw-common/css/Manifest.module.css'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ manifest }) {
	return (
		<ul
			className={styles.ManifestTable}
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
			{manifest?.verifyUrl ?
				<li>
					<a
						href={manifest?.verifyUrl}
						target='_blank'
					>
						View Content Credentials
					</a>
				</li>
			: null}
		</ul>
	)
}

export default ManifestTable