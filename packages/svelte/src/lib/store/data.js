import { writable } from 'svelte/store'

export default function createDataStore() {
	const src = writable(null)
	const alt = writable(null)
	const caption = writable(null)
	const byline = writable(null)
	const manifests = writable([])
	const setSrc = val => src.set(val)
	const setAlt = val => alt.set(val)
	const setCaption = val => caption.set(val)
	const setByline = val => byline.set(val)
	const setManifests = val => manifests.set(val)

	return {
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
}