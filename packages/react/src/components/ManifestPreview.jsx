import { useThumbnailUrl } from '@contentauth/react'
import styles from 'syw-common/css/Manifest.module.scss'
import { handleA11yClick } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
import { useI18nContext } from '$src/context/i18n'

function ManifestPreview({
	manifest,
	toggled,
	onToggle,
	previewRef
}) {
	const { locale } = useI18nContext()
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
				<span>{getDateString(locale, manifest.timestamp)}</span>
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