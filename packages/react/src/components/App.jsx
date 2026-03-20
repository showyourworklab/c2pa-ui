import { useEffect, useMemo, useRef } from 'react'
import 'syw-common/css/styles.css'
import { classNames, getMediaType } from 'syw-common/helpers'
import { prepareManifests } from 'syw-common/helpers/c2pa'
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
import ProvenanceModal from './ProvenanceModal'
import Thumbnail from './Thumbnail'
import { getC2paStatus } from 'syw-common/helpers/c2pa.js'

function App({
	mapOptions,
	trustlistOptions,
	onEvent,
}) {
	const ref = useRef(null)
	const { src, setManifests, setStatus } = useDataContext()
	const { locale } = useI18nContext()
	const { variant, isImageHover, isProvenanceOpen, isThumbnailOpen, setElem, setMapOptions, eventHandler } = useUiContext()
	const { reader, provenance } = useC2pa(src)

	const className = useMemo(() =>
		classNames(
			'App',
			`App_${variant}`,
			isImageHover ? 'App_hovered' : false,
			isProvenanceOpen ? 'App_active' : false
		)
	, [variant, isImageHover, isProvenanceOpen])

	const mediaType = useMemo(() => getMediaType(src), [src])

	useEffect(() => {
		setElem(ref.current);
	}, [ref]);

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions])

	useEffect(() => {
        (async () => {
			const newStatus = await getC2paStatus(provenance)
			setStatus(newStatus)
            const newManifests = await prepareManifests({
				src,
				locale,
				provenance,
				reader
			})
            setManifests(newManifests)
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
				<Collapse
					open={isProvenanceOpen}
					className={classNames('ProvenanceModal')}
				>
					<Provenance />
				</Collapse>
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