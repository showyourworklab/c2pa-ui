import { useEffect, useRef } from 'react'

import styles from '$common/css/Provenance.module.scss'
import { getVerifyUrl } from '$common/helpers'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'

function Provenance() {
	const ref = useRef(null)
	const firstPreviewRef = useRef(null)
	const { src, manifests } = useDataContext()
	const { isOpenProvenance } = useUiContext()
	
	const verifyUrl = getVerifyUrl(src)

	useEffect(() => {
		if(isOpenProvenance && firstPreviewRef.current) {
			firstPreviewRef.current?.focus()
		}
	}, [firstPreviewRef, isOpenProvenance])


	return (
		<div
			ref={ref}
			className={styles.Provenance}
		>
			<ul
				className={styles.ProvenanceList}
			>
				{manifests ? manifests.map((manifest, index) =>
					<Manifest
						key={index}
						manifest={manifest}
						previewRef={index === 0 ? firstPreviewRef : null}
					/>
				) : null}
			</ul>
			<div className={styles.ProvenanceVerify}>
				Verify with&nbsp;
				<a
					href={verifyUrl}
					target='_blank'

				>
					Content Credentials
				</a>
			</div>
		</div>
	)
}

export default Provenance