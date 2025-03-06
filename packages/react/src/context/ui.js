import { createContext, useContext } from 'react'

const UiContext = createContext({
	isHoverImage: false,
	isShowProvenance: false,
	isShowExplainer: false,
	openManifests: {},
	hoverImage: () => false,
	unhoverImage: () => false,
	showProvenance: () => false,
	hideProvenance: () => false,
	showExplainer: () => false,
	hideExplainer: () => false,
	openManifest: () => false,
	closeManifest: () => false,
	eventHandler: null,
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }