import { useCallback, useEffect, useMemo, useState } from 'react'

import styles from '$common/css/Manifest.module.scss'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import ManifestPreview from './ManifestPreview'
import ManifestTable from './ManifestTable'

function Manifest({ manifest, previewRef }) {
	const [open, setOpen] = useState(false)
	const { isShowProvenance } = useUiContext()

	const handleToggle = useCallback(e => {
		setOpen(!open)
	}, [open])

	const className = useMemo(() => [
		styles.Manifest,
		open ? styles.Manifest_open : null
	].filter(c => c).join(' '), [open])

	// Close manifest when provenance is closed
	useEffect(() => {
		if(!isShowProvenance) setOpen(false)
	}, [isShowProvenance])

	return (
		<li
			className={className}
		>
			<div
				className={styles.ManifestRow}
			>
				<ManifestPreview
					data={manifest}
					toggled={open}
					onToggle={handleToggle}
					previewRef={previewRef}
				/>
				<Collapse
					open={open}
				>
					<div
						className={styles.ManifestContent}
					>
						<ManifestTable
							data={manifest}
						/>
					</div>
				</Collapse>
			</div>
		</li>
	)
}

export default Manifest