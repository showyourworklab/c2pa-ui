import { writable, get } from 'svelte/store'
import { createC2pa } from '@contentauth/c2pa-web'
import { getC2paConfig, readC2paFromUrl } from 'syw-common/helpers/c2pa'

const createC2paStore = () => {
	const c2pa = writable(null)
	const reader = writable(null)
	const provenance = writable(null)
	const loading = writable(false)
	const error = writable(null)

	const init = async (config = {}) => {
		try {
			const c2paInstance = await createC2pa(getC2paConfig(config))
			c2pa.set(c2paInstance)
			return c2paInstance
		} catch (err) {
			error.set(err)
			console.error('Failed to initialize C2PA:', err)
			return null
		}
	}

	const read = async (src) => {
		const c2paInstance = get(c2pa)
		if (!c2paInstance || !src) return null

		loading.set(true)
		error.set(null)

		try {
			const result = await readC2paFromUrl(c2paInstance, src)
			reader.set(result.reader)
			provenance.set({ manifestStore: result.manifestStore })
			return result
		} catch (err) {
			error.set(err)
			console.error('Failed to read C2PA data:', err)
			return null
		} finally {
			loading.set(false)
		}
	}

	return {
		c2pa,
		reader,
		provenance,
		loading,
		error,
		init,
		read,
	}
}

export default createC2paStore