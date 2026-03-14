import React, { useRef, useState } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants'
import { UiContext } from '/src/context/ui'

const UiProvider = ({
	variant = VARIANT_DEFAULT,
	children
}) => {
	const [elem, setElem] = useState(null)
	const [mapOptions, setMapOptions] = useState(null)
	const [isHoverImage, setIsHoverImage] = useState(false)
	const [isProvenanceOpen, setIsProvenanceOpen] = useState(false)
	const [isExplainerOpen, setIsExplainerOpen] = useState(false)
	const [isThumbnailOpen, setIsThumbnailOpen] = useState(false)
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailPosition, setThumbnailPosition] = useState(null)
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
		setIsProvenanceOpen(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event) => {
		setIsProvenanceOpen(false)
		handleEvent("provenance.close", event)
	}
	const openExplainer = (event) => {
		setIsExplainerOpen(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event) => {
		setIsExplainerOpen(false)
		handleEvent("explainer.close", event)
	}
	const openManifest = (event, manifest) => {
		const newManifestsOpen = Object.assign(openManifests.current, {})
		newManifestsOpen[manifest.id] = manifest
		openManifests.current = newManifestsOpen
		handleEvent("manifest.open", event, manifest)
	}
	const closeManifest = (event, manifest) => {
		const newManifestsOpen = Object.assign(openManifests.current, {})
		delete newManifestsOpen[manifest.id]
		openManifests.current = newManifestsOpen
		handleEvent("manifest.close", event, manifest)
	}
	const openThumbnail = (event) => {
		setIsThumbnailOpen(true)
		handleEvent("manifest.thumbnail.open", event)
	}
	const closeThumbnail = (event) => {
		setIsThumbnailOpen(false)
		handleEvent("manifest.thumbnail.close", event)
	}
	const addThumbnail = (value, event) => {
		setThumbnail(value)
		handleEvent("manifest.thumbnail.add", event)
	}
	const removeThumbnail = (event) => {
		setThumbnail(null)
		handleEvent("manifest.thumbnail.remove", event)
	}
	const updateThumbnailPosition = (event) => {
		const position = event
		setThumbnailPosition(position)
	}

	return (
		<UiContext.Provider
			value={{
				elem,
				variant,
				mapOptions,
				isHoverImage,
				isProvenanceOpen,
				isExplainerOpen,
				isThumbnailOpen,
				openManifests: openManifests.current,
				thumbnail,
				thumbnailPosition,
				setElem,
				setMapOptions,
				hoverImage,
				unhoverImage,
				openProvenance,
				closeProvenance,
				openExplainer,
				closeExplainer,
				openManifest,
				closeManifest,
				openThumbnail,
				closeThumbnail,
				addThumbnail,
				removeThumbnail,
				updateThumbnailPosition,
				eventHandler,
			}}
		>
			{children}
		</UiContext.Provider>
	)
}

export default UiProvider