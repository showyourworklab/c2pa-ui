import React, { createContext, useContext } from 'react'

const DataContext = createContext({
	src: null,
    alt: null,
    caption: null,
    byline: null,
    manifests: [],
    setManifests: () => false,
});

const useDataContext = () => useContext(DataContext)

export { DataContext, useDataContext }