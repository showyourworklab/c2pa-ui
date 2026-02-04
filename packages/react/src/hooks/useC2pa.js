import { useState, useEffect } from 'react'
import { readC2paFromUrl } from 'syw-common/helpers/c2pa'
import { useC2paContext } from '$src/context/c2pa'

const useC2pa = (src) => {
	const { c2pa } = useC2paContext()
	const [reader, setReader] = useState(null)
	const [provenance, setProvenance] = useState(null)

	useEffect(() => {
		if (!src || !c2pa) return

		let cancelled = false
		const fetchProvenance = async () => {
			try {
				const { manifestStore, reader } = await readC2paFromUrl(c2pa, src)
				if (!cancelled) {
					setReader(reader)
					setProvenance({ manifestStore })
				}
			} catch (error) {
				console.error(error)
			}
		}
		
		fetchProvenance()
		return () => {
			cancelled = true
		}
	}, [src, c2pa])

	return { reader, provenance }
}

export default useC2pa