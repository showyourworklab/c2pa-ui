import React, { useRef, useState } from 'react'

import { UiContext } from '/src/context/ui'

const UiProvider = ({
	variant,
	children
}) => {
	const [isHoverImage, setIsHoverImage] = useState(false)
	const [isOpenProvenance, setIsOpenProvenance] = useState(false)
	const [isOpenExplainer, setIsOpenExplainer] = useState(false)
	const openManifests = useRef({})
	const eventHandler = useRef(null)

	const handleEvent = (type, event, ...args) => {
		if(typeof event?.persist === "function") event.persist()
		const eventHandlerFunc = eventHandler.current
		const nativeEvent = event?.nativeEvent ?? event?.detail?.originalEvent ?? event
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, nativeEvent, ...args)
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
				variant,
				isHoverImage,
				isOpenProvenance,
				isOpenExplainer,
				openManifests: openManifests.current,
				hoverImage,
				unhoverImage,
				openProvenance,
				closeProvenance,
				openExplainer,
				closeExplainer,
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