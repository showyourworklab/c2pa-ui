import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { createC2pa } from '@contentauth/c2pa-web'
import type { C2paSdk } from '@contentauth/c2pa-web'
import { getC2paConfig } from 'syw-common/helpers/c2pa'
import type { C2paOptions } from 'syw-common/types/c2pa'
import { C2paContext } from '$src/context/c2pa'

interface C2paProviderProps {
	c2paOptions?: C2paOptions
	children: ReactNode
}

const C2paProvider = ({
	c2paOptions = {},
	children
}: C2paProviderProps) => {
	const [c2pa, setC2pa] = useState<C2paSdk | null>(null)
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