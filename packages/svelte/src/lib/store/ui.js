import { writable, get } from 'svelte/store'

export const isHoverImage = writable(false)
export const isProvenanceOpen = writable(false)
export const isExplainerOpen = writable(false)
export const openManifests = writable({})
export const eventHandler = writable(null)

const handleEvent = (type, event, ...args) => {
	const eventHandlerFunc = get(eventHandler)
	if(typeof eventHandlerFunc === "function") eventHandlerFunc(type, event, ...args)
}
export const setEventHandler = val => {
	eventHandler.set(val)
}

export const hoverImage = (event) => {
	isHoverImage.set(true)
	handleEvent("image.hover", event)
}
export const unhoverImage = (event) => {
	isHoverImage.set(false)
	handleEvent("image.unhover", event)
}

export const openProvenance = (event) => {
	isProvenanceOpen.set(true)
	handleEvent("provenance.open", event)
}
export const closeProvenance = (event) => {
	isProvenanceOpen.set(false)
	handleEvent("provenance.close", event)
}

export const openExplainer = (event) => {
	isExplainerOpen.set(true)
	handleEvent("explainer.open", event)
}
export const closeExplainer = (event) => {
	isExplainerOpen.set(false)
	handleEvent("explainer.close", event)
}

export const openManifest = (event, manifest) => {
	const newOpenManifests = Object.assign(get(openManifests), {})
	newOpenManifests[manifest.id] = manifest
	openManifests.set(newOpenManifests)
	handleEvent("manifest.open", event, manifest)
}
export const closeManifest = (event, manifest) => {
	const newOpenManifests = Object.assign(get(openManifests), {})
	delete newOpenManifests[manifest.id]
	openManifests.set(newOpenManifests)
	handleEvent("manifest.close", event, manifest)
}