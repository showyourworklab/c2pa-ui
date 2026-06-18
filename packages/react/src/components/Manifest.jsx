import { useCallback, useEffect, useMemo, useState } from 'react'
import { Tabs, useTabs } from '@ark-ui/react/tabs'
import { classNames } from 'syw-common/helpers'
import { MANIFEST_CONTENT_TAB_DEFAULT, MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import ManifestPreview from './ManifestPreview'
import ManifestContent from './ManifestContent'

function Manifest({ manifest, previewRef }) {
	const [open, setOpen] = useState(false)
	const { isProvenanceOpen, openManifests, openManifest, closeManifest, removeThumbnail } = useUiContext()
	const tabs = useTabs({
		defaultValue: MANIFEST_CONTENT_TAB_DEFAULT
	})
	const tabKeys = MANIFEST_CONTENT_TAB_KEYS[manifest?.type?.key] ?? []

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
				<Tabs.RootProvider
					value={tabs}
					keys={tabKeys}
				>
					<ManifestPreview
						manifest={manifest}
						tabKeys={tabKeys}
						toggled={open}
						onToggle={handleToggle}
						previewRef={previewRef}
					/>
					<Collapse
						open={open}
					>
						<ManifestContent
							manifest={manifest}
							tabKeys={tabKeys}
						/>
					</Collapse>
				</Tabs.RootProvider>
			</div>
		</div>
	)
}

export default Manifest