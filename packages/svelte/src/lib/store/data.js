import { writable } from 'svelte/store'

export const src = writable(null)
export const alt = writable(null)
export const caption = writable(null)
export const byline = writable(null)
export const manifests = writable([])

export const setSrc = val => src.set(val)
export const setAlt = val => alt.set(val)
export const setCaption = val => caption.set(val)
export const setByline = val => byline.set(val)
export const setManifests = val => manifests.set(val)

export default {
	src,
	alt,
	caption,
	byline,
	manifests,
	setSrc,
	setAlt,
	setCaption,
	setByline,
	setManifests
}