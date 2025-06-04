import { writable, get } from 'svelte/store'

export default function createUiStore() {

	const isHoverImage = writable(false)
	const isProvenanceOpen = writable(false)
	const isExplainerOpen = writable(false)
	const openManifests = writable({})
	const eventHandler = writable(null)

	const handleEvent = (type, event, ...args) => {
		const eventHandlerFunc = get(eventHandler)
		if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, event, ...args)
	}

	const setEventHandler = val => {
		eventHandler.set(val)
	}

	const hoverImage = (event) => {
		isHoverImage.set(true)
		handleEvent("image.hover", event)
	}
	const unhoverImage = (event) => {
		isHoverImage.set(false)
		handleEvent("image.unhover", event)
	}

	const openProvenance = (event) => {
		isProvenanceOpen.set(true)
		handleEvent("provenance.open", event)
	}
	const closeProvenance = (event) => {
		isProvenanceOpen.set(false)
		handleEvent("provenance.close", event)
	}

	const openExplainer = (event) => {
		isExplainerOpen.set(true)
		handleEvent("explainer.open", event)
	}
	const closeExplainer = (event) => {
		isExplainerOpen.set(false)
		handleEvent("explainer.close", event)
	}

	const openManifest = (event, manifest) => {
		const newOpenManifests = Object.assign(get(openManifests), {})
		newOpenManifests[manifest.id] = manifest
		openManifests.set(newOpenManifests)
		handleEvent("manifest.open", event, manifest)
	}
	const closeManifest = (event, manifest) => {
		const newOpenManifests = Object.assign(get(openManifests), {})
		delete newOpenManifests[manifest.id]
		openManifests.set(newOpenManifests)
		handleEvent("manifest.close", event, manifest)
	}

	return {
		isHoverImage,
		isProvenanceOpen,
		isExplainerOpen,
		openManifests,
		eventHandler,
		setEventHandler,
		hoverImage,
		unhoverImage,
		openProvenance,
		closeProvenance,
		openExplainer,
		closeExplainer,
		openManifest,
		closeManifest
	}
}