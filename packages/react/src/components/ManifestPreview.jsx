import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
import { handleA11yClick, classNames } from 'syw-common/helpers'
import { getDateString } from 'syw-common/helpers/i18n'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import StatusBadge from '$src/components/StatusBadge'
import TypeBadge from '$src/components/TypeBadge'

function ManifestPreview({
	manifest,
	toggled,
	onToggle,
	previewRef
}) {
	const { locale } = useI18nContext()
	const { thumbnail, openThumbnail, closeThumbnail, addThumbnail, removeThumbnail, updateThumbnailPosition } = useUiContext()
	const thumbnailUrl = manifest?.thumbnail?.value
	
	const onKeyDown = event => {
		handleA11yClick(event, onToggle)
	}
	const onThumbnailMouseMove = event => {
		updateThumbnailPosition(event)
	}
	const onThumbnailMouseEnter = event => {
		openThumbnail(event)
		addThumbnail(thumbnailUrl, event)
	}
	const onThumbnailMouseLeave = event => {
		closeThumbnail(event)
		removeThumbnail(event)
	}
	console.log(manifest)
	return (
		<div
			ref={previewRef}
			role='button'
			tabIndex={0}
			aria-pressed={toggled}
			className={classNames('ManifestPreview')}
			onClick={onToggle}
			onKeyDown={onKeyDown}
		>
			<div
				className={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_badges'
				)}
			>
				{manifest.status ?
					<StatusBadge
						value={manifest.status}
						className={classNames(
							'ManifestPreviewCell',
							'ManifestPreviewCell_status'
						)}
					/>
				: null}
				{manifest.type ?
					<TypeBadge
						value={manifest.type}
						className={classNames(
							'ManifestPreviewCell',
							'ManifestPreviewCell_type'
						)}
					/>
				: null}
			</div>
			<div
				className={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_issuer'
				)}
			>
				{MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
					manifest[key]?.value
				).join(" ")}
			</div>
			<div
				className={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_time'
				)}
			>
				<span>{getDateString(locale, manifest.timestamp.value)}</span>
			</div>
			<div
				className={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_thumb',
					thumbnailUrl === thumbnail
						? 'ManifestPreviewCell_thumb_hover'
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