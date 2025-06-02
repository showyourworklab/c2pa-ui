import React, { useRef, useState } from 'react'
import { UiContext } from '/src/context/ui'

const UiProvider = ({
	children
}) => {
	const [isHoverImage, setIsHoverImage] = useState(false)
	const [isOpenProvenance, setIsOpenProvenance] = useState(false)
	const [isOpenExplainer, setIsOpenExplainer] = useState(false)
	const openManifests = useRef({})
	const eventHandler = useRef(null)

	const handleEvent = (type, event, ...args) => {
		event.persist()
		const eventHandlerFunc = eventHandler.current
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, event, ...args)
	}
	const hoverImage = (event) => {
		setIsHoverImage(true)
		handleEvent("image.hover", event)
	}
	const unhoverImage = (event) => {
		setIsHoverImage(false)
		handleEvent("image.unhover", event)
	}
	const openProvenance = (event) => {
		setIsOpenProvenance(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event) => {
		setIsOpenProvenance(false)
		handleEvent("provenance.close", event)
	}
	const openExplainer = (event) => {
		setIsOpenExplainer(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event) => {
		setIsOpenExplainer(false)
		handleEvent("explainer.close", event)
	}
	const openManifest = (event, manifest) => {
		const newOpenManifests = Object.assign(openManifests.current, {})
		newOpenManifests[manifest.id] = manifest
		openManifests.current = newOpenManifests
		handleEvent("manifest.open", event, manifest)
	}
	const closeManifest = (event, manifest) => {
		const newOpenManifests = Object.assign(openManifests.current, {})
		delete newOpenManifests[manifest.id]
		openManifests.current = newOpenManifests
		handleEvent("manifest.close", event, manifest)
	}

	return (
		<UiContext.Provider
			value={{
				isHoverImage,
				isOpenProvenance,
				isOpenExplainer,
				openManifests: openManifests.current,
				hoverImage,
				unhoverImage,
				openProvenance,
				closeProvenance,
				// toggleProvenance,
				openExplainer,
				closeExplainer,
				// toggleExplainer,
				// setActiveManifests,
				openManifest,
				closeManifest,
				eventHandler,
			}}
		>
			{children}
		</UiContext.Provider>
	)
}

export default UiProvider