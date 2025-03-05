import { useThumbnailUrl } from '@contentauth/react'

import styles from '$common/css/Manifest.module.scss'
import { MANIFEST_PREVIEW_TITLE_KEYS } from '$common/constants'
import { handleA11yClick } from '$common/helpers'

function ManifestPreview({
	manifest,
	toggled,
	onToggle,
	previewRef
}) {
	const thumbnailUrl = manifest ? useThumbnailUrl(manifest?.thumbnail ?? undefined) : null

	const onKeyDown = e => handleA11yClick(e, onToggle)

	return (
		<div
			ref={previewRef}
			role='button'
			tabIndex={0}
			aria-pressed={toggled}
			className={styles.ManifestPreview}
			onClick={onToggle}
			onKeyDown={onKeyDown}
		>
			<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_issuer}`}
			>
				{MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
					manifest[key]
				).join(" ")}
			</div>
			<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_time}`}
			>
				<span>{manifest.timestamp}</span>
			</div>
			<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_thumb}`}
			>
				<img
					src={thumbnailUrl}
				/>
			</div>
		</div>
	)
}

export default ManifestPreview