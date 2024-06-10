import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from '$common/css/Provenance.module.scss'
import { useDataContext } from '$src/context/data'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'

function Provenance() {
	const ref = useRef(null)
	const firstPreviewRef = useRef(null)
	const { manifests } = useDataContext()
	const { isShowProvenance } = useUiContext()
	const { locale } = useI18nContext()

	useEffect(() => {
		if(isShowProvenance && firstPreviewRef.current) {
			firstPreviewRef.current?.focus()
		}
	}, [firstPreviewRef, isShowProvenance])


	return (
		<div
			ref={ref}
			className={styles.Provenance}
		>
			<ul
				className={styles.ProvenanceList}
			>
				{manifests ? manifests.map((manifest, i) =>
					<Manifest
						key={i}
						manifest={manifest}
						previewRef={i === 0 ? firstPreviewRef : null}
					/>
				) : null}
			</ul>
			{/*<div className={styles.ProvenanceVerify}>
				Verify with&nbsp;
				<a
					href={verifyUrl}
					target='_blank'

				>
					Content Credentials
				</a>
			</div>*/}
		</div>
	)
}

export default Provenance