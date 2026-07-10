import { writable, get } from 'svelte/store'
import { createC2pa } from '@contentauth/c2pa-web'
import { C2PA_DATA_DEFAULT, C2PA_PHASES, C2PA_STATUSES } from 'syw-common/constants/c2pa'
import { getC2paConfig, prepareData } from 'syw-common/helpers/c2pa'

const createC2paStore = () => {
	const c2pa = writable(null)
	const data = writable(C2PA_DATA_DEFAULT)
	let requestId = 0

	const init = async (config = {}) => {
		try {
			const c2paInstance = await createC2pa(getC2paConfig(config))
			c2pa.set(c2paInstance)
			return c2paInstance
		} catch (err) {
			data.set({
				...C2PA_DATA_DEFAULT,
				phase: C2PA_PHASES.ERROR,
				status: C2PA_STATUSES.UNKNOWN,
				error: err
			})
			return null
		}
	}

	const read = async ({ src, locale }) => {
		const c2paInstance = get(c2pa)
		const id = ++requestId

		if (!src) {
			return {
				src: null,
				...C2PA_DATA_DEFAULT
			}
		}

		if (!c2paInstance) {
			return {
				src,
				...C2PA_DATA_DEFAULT
			}
		}

		const newData = await prepareData({
			c2pa: c2paInstance,
			src,
			locale
		})

		if (id === requestId) data.set(newData)

		return newData
	}

	return { c2pa, data, init, read }
}

export default createC2paStore