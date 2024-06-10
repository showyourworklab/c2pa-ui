import { useEffect, useRef, useState } from 'react'
import { selectProducer } from 'c2pa'
import { useThumbnailUrl } from '@contentauth/react'

import styles from '$common/css/Manifest.module.scss'
import { MANIFEST_KEYS } from '$common/constants'
import ManifestTableRow from './ManifestTableRow'

function ManifestTable({ data }) {
	return (
		<ul
			className={styles.ManifestTable}
		>
			{MANIFEST_KEYS.map(key =>
				data[key] ?
					<ManifestTableRow
						key={key}
						type={key}
						value={data[key]}
					/>
				: null
			)}
			{data?.verifyUrl ?
				<li>
					<a
						href={data?.verifyUrl}
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