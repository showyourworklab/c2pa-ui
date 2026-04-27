import { writable } from 'svelte/store'

export default function createDataStore() {
	const src = writable(null)
	const alt = writable(null)
	const caption = writable(null)
	const byline = writable(null)
	const status = writable(null)
	const types = writable([])
	const manifests = writable([])
	const setSrc = val => src.set(val)
	const setAlt = val => alt.set(val)
	const setCaption = val => caption.set(val)
	const setByline = val => byline.set(val)
	const setStatus = val => status.set(val)
	const setTypes = val => types.set(val)
	const setManifests = val => manifests.set(val)

	return {
		src,
		alt,
		caption,
		byline,
		status,
		types,
		manifests,
		setSrc,
		setAlt,
		setCaption,
		setByline,
		setStatus,
		setTypes,
		setManifests
	}
}