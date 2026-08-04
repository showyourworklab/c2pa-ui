import { createContext, useContext } from 'react'
import type { MutableRefObject } from 'react'
import { VARIANT_DEFAULT } from 'syw-common/constants';
import type { Manifest, ManifestThumbnail } from 'syw-common/types/c2pa'
import type { UiState, UiEventHandler, ThumbnailPosition } from 'syw-common/types/ui'

interface UiContextValue extends UiState {
	setElem: (elem: HTMLElement | null) => void
	setMapOptions: (options: Record<string, unknown> | null) => void
	hoverImage: (event?: unknown) => void
	unhoverImage: (event?: unknown) => void
	openProvenance: (event?: unknown) => void
	closeProvenance: (event?: unknown) => void
	openExplainer: (event?: unknown) => void
	closeExplainer: (event?: unknown) => void
	openManifest: (event: unknown, manifest: Manifest) => void
	closeManifest: (event: unknown, manifest: Manifest) => void
	openThumbnail: (event?: unknown) => void
	closeThumbnail: (event?: unknown) => void
	addThumbnail: (value: ManifestThumbnail, event?: unknown) => void
	removeThumbnail: (event?: unknown) => void
	updateThumbnailPosition: (event: ThumbnailPosition) => void
	eventHandler: MutableRefObject<UiEventHandler | null>
}

const UiContext = createContext<UiContextValue>({
	variant: VARIANT_DEFAULT,
	elem: null,
	mapOptions: {},
	isHoverImage: false,
	isProvenanceOpen: false,
	isExplainerOpen: false,
	isThumbnailOpen: false,
	openManifests: {},
	thumbnail: null,
	thumbnailPosition: null,
	setElem: () => {},
	setMapOptions: () => {},
	hoverImage: () => {},
	unhoverImage: () => {},
	openProvenance: () => {},
	closeProvenance: () => {},
	openExplainer: () => {},
	closeExplainer: () => {},
	openManifest: () => {},
	closeManifest: () => {},
	openThumbnail: () => {},
	closeThumbnail: () => {},
	addThumbnail: () => {},
	removeThumbnail: () => {},
	updateThumbnailPosition: () => {},
	eventHandler: { current: null },
});

const useUiContext = () => useContext(UiContext)

export { UiContext, useUiContext }
