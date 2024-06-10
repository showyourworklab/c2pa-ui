import { writable } from 'svelte/store'

export const isHoverImage = writable(false)
export const isShowProvenance = writable(false)
export const isShowExplainer = writable(false)
export const activeManifests = writable([])

export const hoverImage = () => isHoverImage.set(true)
export const unhoverImage = () => isHoverImage.set(false)

export const showProvenance = () => isShowProvenance.set(true)
export const hideProvenance = () => isShowProvenance.set(false)
export const toggleProvenance = () => isShowProvenance.update(value => !value)

export const showExplainer = () => isShowExplainer.set(true)
export const hideExplainer = () => isShowExplainer.set(false)
export const toggleExplainer = () => isShowExplainer.update(value => !value)