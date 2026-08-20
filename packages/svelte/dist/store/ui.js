import { getContext, setContext } from 'svelte';
import { writable, get } from 'svelte/store';
import { VARIANT_DEFAULT } from 'syw-common/constants/index';
const UI_CONTEXT_KEY = Symbol('ui');
export default function createUiStore() {
    const elem = writable(null);
    const variant = writable(VARIANT_DEFAULT);
    const mapOptions = writable(null);
    const isHoverImage = writable(false);
    const isProvenanceOpen = writable(false);
    const isExplainerOpen = writable(false);
    const isThumbnailOpen = writable(false);
    const openManifests = writable({});
    const thumbnail = writable(null);
    const thumbnailPosition = writable(null);
    const eventHandler = writable(null);
    const setElem = (value) => {
        elem.set(value);
    };
    const setVariant = (value) => {
        variant.set(value);
    };
    const setMapOptions = (value) => {
        mapOptions.set(value);
    };
    const handleEvent = (type, event, ...args) => {
        const eventHandlerFunc = get(eventHandler);
        if (typeof eventHandlerFunc === "function")
            eventHandlerFunc(type, event, ...args);
    };
    const hoverImage = (event) => {
        isHoverImage.set(true);
        handleEvent("image.hover", event);
    };
    const unhoverImage = (event) => {
        isHoverImage.set(false);
        handleEvent("image.unhover", event);
    };
    const openProvenance = (event) => {
        isProvenanceOpen.set(true);
        handleEvent("provenance.open", event);
    };
    const closeProvenance = (event) => {
        isProvenanceOpen.set(false);
        openManifests.set({});
        handleEvent("provenance.close", event);
    };
    const openExplainer = (event) => {
        isExplainerOpen.set(true);
        handleEvent("explainer.open", event);
    };
    const closeExplainer = (event) => {
        isExplainerOpen.set(false);
        handleEvent("explainer.close", event);
    };
    const openManifest = (event, manifest) => {
        const newOpenManifests = Object.assign(get(openManifests), {});
        newOpenManifests[String(manifest.id)] = manifest;
        openManifests.set(newOpenManifests);
        handleEvent("manifest.open", event, manifest);
    };
    const closeManifest = (event, manifest) => {
        const newOpenManifests = Object.assign(get(openManifests), {});
        delete newOpenManifests[String(manifest.id)];
        openManifests.set(newOpenManifests);
        handleEvent("manifest.close", event, manifest);
    };
    const openThumbnail = (event) => {
        isThumbnailOpen.set(true);
        handleEvent("manifest.thumbnail.open", event);
    };
    const closeThumbnail = (event) => {
        isThumbnailOpen.set(false);
        handleEvent("manifest.thumbnail.close", event);
    };
    const addThumbnail = (value, event) => {
        thumbnail.set(value);
        handleEvent("manifest.thumbnail.add", event);
    };
    const removeThumbnail = (event) => {
        thumbnail.set(null);
        handleEvent("manifest.thumbnail.remove", event);
    };
    const updateThumbnailPosition = (event) => {
        const position = event;
        thumbnailPosition.set(position);
    };
    const setEventHandler = (val) => {
        eventHandler.set(val);
    };
    return {
        elem,
        variant,
        mapOptions,
        isHoverImage,
        isProvenanceOpen,
        isExplainerOpen,
        isThumbnailOpen,
        openManifests,
        thumbnail,
        thumbnailPosition,
        eventHandler,
        setElem,
        setVariant,
        setMapOptions,
        hoverImage,
        unhoverImage,
        openProvenance,
        closeProvenance,
        openExplainer,
        closeExplainer,
        openManifest,
        closeManifest,
        openThumbnail,
        closeThumbnail,
        addThumbnail,
        removeThumbnail,
        updateThumbnailPosition,
        setEventHandler,
    };
}
export const setUiContext = (store) => setContext(UI_CONTEXT_KEY, store);
export const getUiContext = () => getContext(UI_CONTEXT_KEY);
