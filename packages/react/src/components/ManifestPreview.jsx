import { useEffect, useRef, useState } from 'react'
import { selectProducer } from 'c2pa'
import { useThumbnailUrl } from '@contentauth/react'

import styles from '$common/css/Manifest.module.scss'
import { handleA11yClick } from '$common/helpers'

function ManifestPreview({
	data,
	toggled,
	onToggle,
	previewRef
}) {
	const thumbnailUrl = data ? useThumbnailUrl(data?.thumbnail ?? undefined) : null

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
			{/*<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_name}`}
			>
				<span>{producer?.name}</span>
			</div>*/}
			<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_issuer}`}
			>
				<span>{data.signator}</span>
			</div>
			<div
				className={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_time}`}
			>
				<span>{data.timestamp}</span>
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