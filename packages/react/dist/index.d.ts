import type { FC } from 'react'

export type SywEventType =
    | 'image.hover'
    | 'image.unhover'
    | 'provenance.open'
    | 'provenance.close'
    | 'explainer.open'
    | 'explainer.close'
    | 'manifest.open'
    | 'manifest.close'
    | 'manifest.thumbnail.open'
    | 'manifest.thumbnail.close'
    | 'manifest.thumbnail.add'
    | 'manifest.thumbnail.remove'

export type SywEventHandler = (
    type: SywEventType | string,
    event: Event | MouseEvent | KeyboardEvent | unknown,
    ...args: unknown[]
) => void

export interface SywReactProps {
    locale?: string
    src: string
    alt?: string
    caption?: string
    byline?: string
    variant?: 'expand' | 'modal' | string
    c2paOptions?: {
        wasmSrc?: string
        settings?: {
            trust?: {
                trustAnchors?: string
            }
        }
    }
    mapOptions?: Record<string, unknown>
    onEvent?: SywEventHandler
}

// Import types from common
interface C2paOptions {
    wasmSrc?: string
    settings?: {
        trust?: {
            trustAnchors?: string | string[]
        }
    }
}

interface ParseSywDataOptions {
    locale?: string
    c2paOptions?: C2paOptions
}

interface ParsedC2paData {
    src: string
    phase: string
    status: string
    manifests: any[]
    types: any[]
    provenance: any
    reader: any
    error: Error | null
}

declare const SywReact: FC<SywReactProps>
export default SywReact
export { SywReact }
export function parseSywData(
    src: string,
    options?: ParseSywDataOptions
): Promise<ParsedC2paData>