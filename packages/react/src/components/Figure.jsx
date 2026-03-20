import { useCallback } from 'react'
import { classNames, handleA11yClick } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'

const isClickableElem = (event) =>
	["IMG", "VIDEO"].includes(event.target.tagName)

const Figure = ({
	children
}) => {
	const {
		hoverImage,
		unhoverImage,
		openProvenance,
		closeProvenance,
		isProvenanceOpen,
	} = useUiContext()

	const onClick = useCallback(event => {
		if(isClickableElem(event)) {
			if(isProvenanceOpen) {
				closeProvenance(event)
			} else {
				openProvenance(event)
			}
		}
	}, [openProvenance, closeProvenance, isProvenanceOpen])

	const onKeyDown = useCallback(event => {
		if(isClickableElem(event)) {
			handleA11yClick(
				event,
				isProvenanceOpen
					? closeProvenance
					: openProvenance
			)
		}
	}, [openProvenance, closeProvenance, isProvenanceOpen])

	const onMouseEnter = useCallback(event =>
		hoverImage(event)
	, [hoverImage])
	
	const onMouseLeave = useCallback(event =>
		unhoverImage(event)
	, [unhoverImage])

	return (
		<figure
			tabIndex={0}
			onClick={onClick}
			onKeyDown={onKeyDown}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={classNames('Figure')}
		>
			{children}
		</figure>
	)
}

export default Figure