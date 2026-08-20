import type { C2paOptions } from './c2pa.js'
import type { UiEventHandler, Variant } from './ui.js'

/** The public embed contract shared by syw-react's <SywReact> and syw-svelte's <App>. */
export interface SywEmbedProps {
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
