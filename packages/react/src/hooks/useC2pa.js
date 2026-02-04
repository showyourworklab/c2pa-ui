import { useState, useEffect } from 'react'
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
				const response = await fetch(src)
				const blob = await response.blob()
				const reader = await c2pa.reader.fromBlob(blob.type, blob)
				const manifestStore = await reader.manifestStore()
				// await reader.free();
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