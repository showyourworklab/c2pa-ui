import { useThumbnailUrl } from '@contentauth/react'
import styles from 'syw-common/css/Manifest.module.css'
import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
import { handleA11yClick, joinClassNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'

function ManifestPreview({
	manifest,
	toggled,
	onToggle,
	previewRef
}) {
	const { locale } = useI18nContext()
	const { compareImage, addCompareImage, removeCompareImage, updateComparePosition } = useUiContext()
	const thumbnailUrl = manifest ? useThumbnailUrl(manifest?.thumbnail ?? undefined) : null
	
	const onKeyDown = event => handleA11yClick(event, onToggle)
	const onThumbnailMouseMove = event => {
		updateComparePosition(event)
	}
	const onThumbnailMouseEnter = event => {
		addCompareImage(thumbnailUrl, event)
	}
	const onThumbnailMouseLeave = event => {
		removeCompareImage(event)
	}

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
				<span>{getDateString(locale, manifest.timestamp)}</span>
			</div>
			<div
				className={joinClassNames(
					styles.ManifestPreviewCell,
					styles.ManifestPreviewCell_thumb,
					thumbnailUrl === compareImage
						? styles.ManifestPreviewCell_thumb_hover
						: null
				)}
				onMouseMove={onThumbnailMouseMove}
				onMouseEnter={onThumbnailMouseEnter}
				onMouseLeave={onThumbnailMouseLeave}
			>
				<img
					src={thumbnailUrl}
				/>
			</div>
		</div>
	)
}

export default ManifestPreview