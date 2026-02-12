import { createContext, useContext } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants';

const UiContext = createContext({
	variant: VARIANT_DEFAULT,
	elem: null,
	isImageHover: false,
	isProvenanceOpen: false,
	isExplainerOpen: false,
	openManifests: {},
	compareImage: null,
	setElem: () => false,
	hoverImage: () => false,
	unhoverImage: () => false,
	openProvenance: () => false,
	closeProvenance: () => false,
	openExplainer: () => false,
	closeExplainer: () => false,
	openManifest: () => false,
	closeManifest: () => false,
	addCompareImage: () => false,
	removeCompareImage: () => false,
	updateComparePosition: () => false,
	eventHandler: null,
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }