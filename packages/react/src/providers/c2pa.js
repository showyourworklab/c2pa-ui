import React, { useState, useEffect } from 'react'
import { createC2pa } from '@contentauth/c2pa-web'
import { C2paContext } from '/src/context/c2pa'

const CDN_WASM_SRC_URL = 'https://cdn.jsdelivr.net/npm/@contentauth/c2pa-web/dist/resources/c2pa_bg.wasm'

const C2paProvider = ({
	children
}) => {
	const [c2pa, setC2pa] = useState(null)

	useEffect(() => {
		const initC2pa = async () => {
			const c2paInstance = await createC2pa({
				wasmSrc: CDN_WASM_SRC_URL,
			})
			setC2pa(c2paInstance)
		}
		initC2pa()
	}, [])

	return (
		<C2paContext.Provider
			value={{
				c2pa,
			}}
		>
			{children}
		</C2paContext.Provider>
	)
}

export default C2paProvider