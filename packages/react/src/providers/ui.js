import React, { useCallback, useState } from 'react'

import { UiContext } from '/src/context/ui'

const UiProvider = ({
	children
}) => {
	const [isHoverImage, setIsHoverImage] = useState(false)
	const [isShowProvenance, setIsShowProvenance] = useState(false)
	const [isShowExplainer, setIsShowExplainer] = useState(false)
	const [activeManifests, setActiveManifests] = useState([])

	const hoverImage = () => setIsHoverImage(true)
	const unhoverImage = () => setIsHoverImage(false)
	const showProvenance = () => setIsShowProvenance(true)
	const hideProvenance = () => setIsShowProvenance(false)
	const toggleProvenance = () => setIsShowProvenance(!isShowProvenance)
	const showExplainer = () => setIsShowExplainer(true)
	const hideExplainer = () => setIsShowExplainer(false)
	const toggleExplainer = () => setIsShowExplainer(!isShowExplainer)

	return (
		<UiContext.Provider
			value={{
				isHoverImage,
				isShowProvenance,
				isShowExplainer,
				activeManifests,
				hoverImage,
				unhoverImage,
				showProvenance,
				hideProvenance,
				toggleProvenance,
				showExplainer,
				hideExplainer,
				toggleExplainer,
				setActiveManifests,
			}}
		>
			{children}
		</UiContext.Provider>
	)
}

export default UiProvider