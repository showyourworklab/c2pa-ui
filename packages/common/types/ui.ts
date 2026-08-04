import type { C2paStatus, Manifest, ManifestThumbnail, ManifestTypeKey } from './c2pa'

export type MediaType = 'image' | 'video'

export type IconType = C2paStatus | ManifestTypeKey | 'origin' | 'missing' | 'close'

export interface ThumbnailPosition {
	clientX: number
	clientY: number
}

export interface UiState {
	variant: string
	elem: HTMLElement | null
	mapOptions: Record<string, unknown> | null
	isHoverImage: boolean
	isProvenanceOpen: boolean
	isExplainerOpen: boolean
	isThumbnailOpen: boolean
	openManifests: Record<string, Manifest>
	thumbnail: ManifestThumbnail
	thumbnailPosition: ThumbnailPosition | null
}

export type UiEventHandler = (type: string, event: unknown, ...args: unknown[]) => void