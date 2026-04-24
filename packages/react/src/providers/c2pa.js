import React, { useState, useEffect } from 'react'
import { createC2pa } from '@contentauth/c2pa-web'
import { getC2paConfig } from 'syw-common/helpers/c2pa'
import { C2paContext } from '/src/context/c2pa'

const C2paProvider = ({
	c2paOptions = {},
	children
}) => {
	const [c2pa, setC2pa] = useState(null)
	useEffect(() => {
		const initC2pa = async () => {
			const c2paInstance = await createC2pa(getC2paConfig(c2paOptions))
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