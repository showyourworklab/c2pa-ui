import { writable } from 'svelte/store'
import { C2PA_DATA_DEFAULT } from 'syw-common/constants/c2pa'

export default function createDataStore() {
	const src = writable(C2PA_DATA_DEFAULT.src)
	const alt = writable(C2PA_DATA_DEFAULT.alt)
	const caption = writable(C2PA_DATA_DEFAULT.caption)
	const byline = writable(C2PA_DATA_DEFAULT.byline)
	const phase = writable(C2PA_DATA_DEFAULT.phase)
	const status = writable(C2PA_DATA_DEFAULT.status)
	const manifests = writable(C2PA_DATA_DEFAULT.manifests)
	const types = writable(C2PA_DATA_DEFAULT.types)
	const provenance = writable(C2PA_DATA_DEFAULT.provenance)
	const reader = writable(C2PA_DATA_DEFAULT.reader)
	const error = writable(C2PA_DATA_DEFAULT.error)

	const setSrc = val => src.set(val)
	const setAlt = val => alt.set(val)
	const setCaption = val => caption.set(val)
	const setByline = val => byline.set(val)
	const setPhase = val => phase.set(val)
	const setStatus = val => status.set(val)
	const setManifests = val => manifests.set(val ?? [])
	const setTypes = val => types.set(val ?? [])
	const setProvenance = val => provenance.set(val ?? null)
	const setReader = val => reader.set(val ?? null)
	const setError = val => error.set(val ?? null)

	const setC2paData = (c2paData = C2PA_DATA_DEFAULT) => {
		setPhase(c2paData.phase)
		setStatus(c2paData.status)
		setManifests(c2paData.manifests)
		setTypes(c2paData.types)
		setProvenance(c2paData.provenance)
		setReader(c2paData.reader)
		setError(c2paData.error)
	}

	return {
		src,
		alt,
		caption,
		byline,
		phase,
		status,
		manifests,
		types,
		provenance,
		reader,
		error,
		setSrc,
		setAlt,
		setCaption,
		setByline,
		setPhase,
		setStatus,
		setManifests,
		setTypes,
		setProvenance,
		setReader,
		setError,
		setC2paData
	}
}