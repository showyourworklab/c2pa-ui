import { useEffect, useMemo, useRef } from 'react'
import 'syw-common/css/styles.css'
import { classNames, getMediaType } from 'syw-common/helpers'
import { prepareManifests, getTypes, getC2paStatus } from 'syw-common/helpers/c2pa'
import { useDataContext } from '$src/context/data'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import useC2pa from '$src/hooks/useC2pa'
import Figure from './Figure'
import Image from './Image'
import Video from './Video'
import Cutline from './Cutline'
import Caption from './Caption'
import Explainer from './Explainer'
import Provenance from './Provenance'
import Collapse from './Collapse'
import ProvenanceExpand from './ProvenanceExpand'
import ProvenanceModal from './ProvenanceModal'
import Thumbnail from './Thumbnail'

function App({
	mapOptions,
	onEvent,
}) {
	const ref = useRef(null)
	const { src, setManifests, setTypes, setStatus } = useDataContext()
	const { locale } = useI18nContext()
	const { variant, isHoverImage, isProvenanceOpen, isThumbnailOpen, setElem, setMapOptions, eventHandler } = useUiContext()
	const { reader, provenance } = useC2pa(src)

	const className = useMemo(() =>
		classNames(
			'App',
			`App_${variant}`,
			isHoverImage ? 'App_hovered' : false,
			isProvenanceOpen ? 'App_active' : false
		)
	, [variant, isHoverImage, isProvenanceOpen])

	const mediaType = useMemo(() => getMediaType(src), [src])

	useEffect(() => {
		setElem(ref.current);
	}, [ref]);

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions])

	useEffect(() => {
        (async () => {
            const newManifests = await prepareManifests({
				src,
				locale,
				provenance,
				reader
			})
			const newTypes = getTypes(newManifests)
			const newStatus = await getC2paStatus(provenance)
            setManifests(newManifests)
			setTypes(newTypes)
			setStatus(newStatus)
        })()
	}, [src, locale, provenance, reader])

	useEffect(() => {
		eventHandler.current = onEvent
	}, [eventHandler, onEvent])

	return (
		<div
			ref={ref}
			className={className}
		>
			<Figure>
				{mediaType === "image" ?
					<Image />
				: null}
				{mediaType === "video" ?
					<Video />
				: null}
				{variant === 'expand' ?
					<Explainer />
				: null}
				<Cutline />
				<Caption />
			</Figure>
			{variant === 'expand' ?
				<ProvenanceExpand />
			: null}
			{variant === 'modal' ?
				<ProvenanceModal />
			: null}
			{isThumbnailOpen ?
				<Thumbnail />
			: null}
		</div>
	)
}

export default App