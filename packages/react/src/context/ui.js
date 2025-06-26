import { createContext, useContext } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants';

const UiContext = createContext({
	elem: null,
	variant: VARIANT_DEFAULT,
	isHoverImage: false,
	isShowProvenance: false,
	isShowExplainer: false,
	openManifests: {},
	compareImage: null,
	setElem: () => false,
	hoverImage: () => false,
	unhoverImage: () => false,
	showProvenance: () => false,
	hideProvenance: () => false,
	showExplainer: () => false,
	hideExplainer: () => false,
	openManifest: () => false,
	closeManifest: () => false,
	addCompareImage: () => false,
	removeCompareImage: () => false,
	updateComparePosition: () => false,
	eventHandler: null,
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }