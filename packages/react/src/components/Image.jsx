import { useCallback } from 'react'
import { classNames, handleA11yClick } from 'syw-common/helpers'
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
		openProvenance,
		closeProvenance,
		isOpenProvenance,
	} = useUiContext()

	const onClick = useCallback(event =>
		isOpenProvenance
			? closeProvenance(event)
			: openProvenance(event)
	, [openProvenance, closeProvenance, isOpenProvenance])

	const onKeyDown = useCallback(event =>
		handleA11yClick(
			event,
			isOpenProvenance
				? closeProvenance
				: openProvenance
		)
	, [openProvenance, closeProvenance, isOpenProvenance])

	const onMouseEnter = useCallback(event =>
		hoverImage(event)
	, [hoverImage])
	
	const onMouseLeave = useCallback(event =>
		unhoverImage(event)
	, [unhoverImage])


	return (
		<div
			className={classNames('Image')}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			tabIndex={0}
		>
			<img
				src={src}
				alt={alt}
				className={classNames('ImageImg')}
			/>
		</div>
	)
}

export default Image