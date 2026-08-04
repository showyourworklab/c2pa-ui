import { createContext, useContext } from 'react'
import type { C2paSdk } from '@contentauth/c2pa-web'

interface C2paContextValue {
	c2pa: C2paSdk | null
}

const C2paContext = createContext<C2paContextValue>({
	c2pa: null,
});

const useC2paContext = () => useContext(C2paContext)

export { C2paContext, useC2paContext }
