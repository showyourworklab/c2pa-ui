import { useEffect, useRef } from 'react'
import { classNames, getVerifyUrl } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'

function Provenance() {
	const ref = useRef(null)
	const firstPreviewRef = useRef(null)
	const { getText } = useI18nContext()
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
			className={classNames('Provenance')}
		>
			<ul
				className={classNames('ProvenanceList')}
			>
				{manifests ? manifests.map((manifest, index) =>
					<Manifest
						key={index}
						manifest={manifest}
						previewRef={index === 0 ? firstPreviewRef : null}
					/>
				) : null}
			</ul>
			<div className={classNames('ProvenanceVerify')}>
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