import type { VARIANT_KEYS } from '#constants/index'
import type { C2paStatus, Manifest, ManifestThumbnail, ManifestTypeKey } from './c2pa.js'

export type Variant = typeof VARIANT_KEYS[number]

export type MapOptions = Record<string, unknown> | null

export type MediaType = 'image' | 'video'

export type IconType = C2paStatus | ManifestTypeKey | 'origin' | 'missing' | 'up' | 'down' | 'close'

export interface UiState {
	variant: Variant | string
	elem: HTMLElement | null
	mapOptions: MapOptions
	isHoverImage: boolean
	isProvenanceOpen: boolean
	isExplainerOpen: boolean
	openManifests: Record<string, Manifest>
}

export type UiEventType =
	| 'image.hover'
	| 'image.unhover'
	| 'provenance.open'
	| 'provenance.close'
	| 'explainer.open'
	| 'explainer.close'
	| 'manifest.open'
	| 'manifest.close'

export type UiEventHandler = (type: UiEventType | string, event: unknown, ...args: unknown[]) => void