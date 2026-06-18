import { useCallback, useEffect, useMemo, useState } from 'react'
import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import ManifestPreview from './ManifestPreview'
import ManifestContent from './ManifestContent'

function Manifest({ manifest, previewRef }) {
	const [open, setOpen] = useState(false)
	const { isProvenanceOpen, openManifests, openManifest, closeManifest, removeThumbnail } = useUiContext()

	const className = useMemo(() =>
		classNames(
			'Manifest',
			open ? 'Manifest_open' : null
		)
	, [open])

	// Handle click of manifest preview / header
	const handleToggle = useCallback(event => {
		removeThumbnail()
		setOpen(!open)
		if(open) {
			closeManifest(event, manifest)
		} else {
			openManifest(event, manifest)
		}
	}, [open, manifest, openManifest, closeManifest, openManifests])

	// Close manifest when provenance is closed
	useEffect(() => {
		if(!isProvenanceOpen) setOpen(false)
	}, [isProvenanceOpen])

	return (
		<div
			className={className}
		>
			<div
				className={
					classNames(
						'ManifestRow',
						open ? 'ManifestRow_open' : null
					)
				}
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
					<ManifestContent
						manifest={manifest}
					/>
				</Collapse>
			</div>
		</div>
	)
}

export default Manifest