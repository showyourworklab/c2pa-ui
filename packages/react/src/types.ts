import type { C2paOptions } from 'syw-common/types/c2pa'
import type { UiEventHandler, Variant } from 'syw-common/types/ui'

export interface SywReactProps {
	locale?: string
	src: string
	alt?: string
	caption?: string
	byline?: string
	variant?: Variant | string
	c2paOptions?: C2paOptions
	mapOptions?: Record<string, unknown> | null
	onEvent?: UiEventHandler
}
