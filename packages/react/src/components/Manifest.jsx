import { useCallback, useEffect, useMemo, useState } from 'react'
import { Tabs, useTabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers'
import { MANIFEST_CONTENT_TAB_DEFAULT, MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import ManifestPreview from './ManifestPreview'
import ManifestContent from './ManifestContent'

function Manifest({
	manifest,
	previewRef
}) {
	const [open, setOpen] = useState(false)
	const { isProvenanceOpen, openManifests, openManifest, closeManifest, removeThumbnail } = useUiContext()

	const tabKeys = useMemo(() =>
		MANIFEST_CONTENT_TAB_KEYS[manifest?.type?.key] ?? []
	, [manifest])

	const availableTabKeys = useMemo(() =>
		getAvailableTabs(tabKeys, manifest)
	, [tabKeys, manifest])

	const tabs = useTabs({
		defaultValue: availableTabKeys[0]
	})

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
					classNames('ManifestInner')
				}
			>
				<Tabs.RootProvider
					value={tabs}
					keys={tabKeys}
				>
					<ManifestPreview
						open={open}
						manifest={manifest}
						tabKeys={tabKeys}
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