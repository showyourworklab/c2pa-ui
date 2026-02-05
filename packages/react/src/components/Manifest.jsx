import { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import ManifestPreview from './ManifestPreview'
import ManifestTable from './ManifestTable'

function Manifest({ manifest, previewRef }) {
	const [open, setOpen] = useState(false)
	const { isOpenProvenance, openManifests, openManifest, closeManifest, removeCompareImage } = useUiContext()

	const className = useMemo(() =>
		classNames(
			'Manifest',
			open ? 'Manifest_open' : null
		)
	, [open])

	// Handle click of manifest preview / header
	const handleToggle = useCallback(event => {
		removeCompareImage()
		setOpen(!open)
		if(open) {
			closeManifest(event, manifest)
		} else {
			openManifest(event, manifest)
		}
	}, [open, manifest, openManifest, closeManifest, openManifests])

	// Close manifest when provenance is closed
	useEffect(() => {
		if(!isOpenProvenance) setOpen(false)
	}, [isOpenProvenance])


	return (
		<li
			className={className}
		>
			<div
				className={classNames('ManifestRow')}
			>
				<ManifestPreview
					manifest={manifest}
					toggled={open}
					onToggle={handleToggle}
					previewRef={previewRef}
				/>
				<Collapse
					open={open}
				>
					<div
						className={classNames('ManifestContent')}
					>
						<ManifestTable
							manifest={manifest}
						/>
					</div>
				</Collapse>
			</div>
		</li>
	)
}

export default Manifest