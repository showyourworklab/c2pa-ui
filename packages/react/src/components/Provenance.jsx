import { useEffect, useRef } from 'react'
import styles from 'syw-common/css/Provenance.module.scss'
import { getVerifyUrl } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'

function Provenance() {
	const ref = useRef(null)
	const firstPreviewRef = useRef(null)
	const { locale, getText } = useI18nContext()
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
				{getText('verify', 'pre')}&nbsp;
				<a
					href={verifyUrl}
					target='_blank'

				>
					{getText('verify', 'cc')}
				</a>
			</div>
		</div>
	)
}

export default Provenance