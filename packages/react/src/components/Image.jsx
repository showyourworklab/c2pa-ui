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
		isProvenanceOpen,
	} = useUiContext()

	const onClick = useCallback(event =>
		isProvenanceOpen
			? closeProvenance(event)
			: openProvenance(event)
	, [openProvenance, closeProvenance, isProvenanceOpen])

	const onKeyDown = useCallback(event =>
		handleA11yClick(
			event,
			isProvenanceOpen
				? closeProvenance
				: openProvenance
		)
	, [openProvenance, closeProvenance, isProvenanceOpen])

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