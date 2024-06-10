import React, { createContext, useContext } from 'react'

const UiContext = createContext({
	isHoverImage: false,
	isShowProvenance: false,
	isShowExplainer: false,
	activeManifests: [],
	hoverImage: () => false,
	unhoverImage: () => false,
	showProvenance: () => false,
	hideProvenance: () => false,
	toggleProvenance: () => false,
	showExplainer: () => false,
	hideExplainer: () => false,
	toggleExplainer: () => false,
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }