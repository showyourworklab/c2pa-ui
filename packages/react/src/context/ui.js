import { createContext, useContext } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants';

const UiContext = createContext({
	variant: VARIANT_DEFAULT,
	elem: null,
	mapOptions: {},
	isImageHover: false,
	isProvenanceOpen: false,
	isExplainerOpen: false,
	isThumbnailOpen: false,
	openManifests: {},
	thumbnail: null,
	setElem: () => false,
	hoverImage: () => false,
	unhoverImage: () => false,
	openProvenance: () => false,
	closeProvenance: () => false,
	openExplainer: () => false,
	closeExplainer: () => false,
	openManifest: () => false,
	closeManifest: () => false,
	openThumbnail: () => false,
	closeThumbnail: () => false,
	addThumbnail: () => false,
	removeThumbnail: () => false,
	updateThumbnailPosition: () => false,
	eventHandler: null,
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }