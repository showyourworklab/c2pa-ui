import { createContext, useContext } from 'react'

const C2paContext = createContext({
	c2pa: null,
});

const useC2paContext = () => useContext(C2paContext)

export { C2paContext, useC2paContext }