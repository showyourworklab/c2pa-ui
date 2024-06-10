import React, { useCallback } from 'react'

import styles from '$common/css/Image.module.scss'
import { handleA11yClick } from '$common/helpers'
import { useDataContext } from '$src/context/data'
import { useUiContext } from '$src/context/ui'

const Image = () => {
	const {
		src,
		alt,
	} = useDataContext()
	const {
		hoverImage,
		unhoverImage,
		toggleProvenance,
	} = useUiContext()

	const onClick = useCallback(toggleProvenance)

	const onKeyDown = useCallback(e =>
		handleA11yClick(e, toggleProvenance)
	, [toggleProvenance])

	const onMouseEnter = useCallback(() =>
		hoverImage()
	, [hoverImage])
	
	const onMouseLeave = useCallback(() =>
		unhoverImage()
	, [unhoverImage])


	return (
		<div
			className={styles.Image}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			tabIndex={0}
		>
			<img
				src={src}
				alt={alt}
				className={styles.ImageImg}
			/>
		</div>
	)
}

export default Image