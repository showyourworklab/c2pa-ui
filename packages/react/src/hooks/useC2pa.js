import { useState, useEffect, useRef } from 'react'
import { C2PA_DATA_DEFAULT, C2PA_PHASES } from 'syw-common/constants/c2pa'
import { prepareData } from 'syw-common/helpers/c2pa'
import { useC2paContext } from '$src/context/c2pa'

const useC2pa = ({ src, locale }) => {
	const { c2pa } = useC2paContext()
	const [data, setData] = useState(C2PA_DATA_DEFAULT)
	const requestIdRef = useRef(0)

	useEffect(() => {
		const id = ++requestIdRef.current

		if (!src || !c2pa) {
			setData(C2PA_DATA_DEFAULT)
			return
		}

		setData(prev => ({ ...prev, phase: C2PA_PHASES.LOADING }))

		;(async () => {
			const next = await prepareData({ c2pa, src, locale })
			if (id === requestIdRef.current) setData(next)
		})()
	}, [src, locale, c2pa])

	return data
}

export default useC2pa