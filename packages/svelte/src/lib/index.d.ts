import type { Component } from 'svelte'

export interface AppProps {
    variant?: string
    src?: string
    alt?: string
    caption?: string
    byline?: string
    locale?: string
    onEvent?: ((event: any) => void) | null
}

declare const App: Component<AppProps>
declare const Caption: Component<{}>
declare const Collapse: Component<{ open?: boolean; className?: string }>
declare const Cutline: Component<{}>
declare const Explainer: Component<{}>
declare const ExplainerToggle: Component<{}>
declare const Figure: Component<{}>
declare const Image: Component<{}>
declare const ImageCompare: Component<{}>
declare const Manifest: Component<{}>
declare const ManifestPreview: Component<{}>
declare const ManifestTable: Component<{}>
declare const ManifestTableRow: Component<{}>
declare const Modal: Component<{}>
declare const Provenance: Component<{}>
declare const ProvenanceToggle: Component<{}>
declare const ProvenanceModal: Component<{}>
declare const ProvenanceExpand: Component<{}>

export {
    App,
    Caption,
    Collapse,
    Cutline,
    Explainer,
    ExplainerToggle,
    Figure,
    Image,
    ImageCompare,
    Manifest,
    ManifestPreview,
    ManifestTable,
    ManifestTableRow,
    Modal,
    Provenance,
    ProvenanceToggle,
    ProvenanceModal,
    ProvenanceExpand
}

export default App