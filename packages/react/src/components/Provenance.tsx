import { useEffect, useRef } from 'react'
import { classNames } from 'syw-common/helpers'
import { getVerifyUrl } from 'syw-common/helpers/c2pa'
import { VERIFY_BASE_URL } from 'syw-common/constants'
import { useI18nContext } from '$src/context/i18n'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'
import Manifest from './Manifest'

function Provenance() {
	const ref = useRef<HTMLDivElement>(null)
	const firstPreviewRef = useRef<HTMLDivElement>(null)
	const { getText } = useI18nContext()
	const { src, manifests } = useDataContext()
	const { isProvenanceOpen } = useUiContext()

	const verifyUrl = getVerifyUrl(src ?? '')

	useEffect(() => {
		if(isProvenanceOpen && firstPreviewRef.current) {
			firstPreviewRef.current?.focus()
		}
	}, [firstPreviewRef, isProvenanceOpen])

	return (
		<div
			ref={ref}
			className={classNames('Provenance')}
		>
			{manifests && manifests.length ?
				<div
					className={classNames('ProvenanceList')}
				>
					{manifests.map((manifest, index) =>
						<Manifest
							key={index}
							manifest={manifest}
							previewRef={index === 0 ? firstPreviewRef : null}
						/>
					)}
				</div>
			: null}
			{!manifests || !manifests.length ?
				<div
					className={classNames('ProvenanceNone')}
				>
					{getText("provenance", "missing")}
				</div>
			: null}
			<div
				className={classNames('ProvenanceVerify')}
			>
				{getText('verify', 'pre')}&nbsp;
				<a
					href={verifyUrl}
					target='_blank'

				>
					{VERIFY_BASE_URL}
				</a>
			</div>
		</div>
	)
}

export default Provenance