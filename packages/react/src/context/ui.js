import { createContext, useContext } from 'react'
import { DEFAULT_VARIANT } from "$common/constants"

const UiContext = createContext({
	variant: DEFAULT_VARIANT,
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