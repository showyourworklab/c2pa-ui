import { createContext, useContext } from 'react'

const DataContext = createContext({
	src: null,
    alt: null,
    caption: null,
    byline: null,
    status: null,
    types: [],
    manifests: [],
    setManifests: () => false,
});

const useDataContext = () => useContext(DataContext)

export { DataContext, useDataContext }