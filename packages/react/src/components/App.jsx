import { useEffect, useMemo, useRef } from 'react'
import 'syw-common/css/styles.css'
import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import Figure from './Figure'
import Cutline from './Cutline'
import Caption from './Caption'
import Explainer from './Explainer'
import ProvenanceExpand from './ProvenanceExpand'
import ProvenanceModal from './ProvenanceModal'
import Thumbnail from './Thumbnail'
import Media from './Media'

function App({ mapOptions, onEvent }) {
	const ref = useRef(null)
	const {
		variant, isHoverImage, isProvenanceOpen, isThumbnailOpen, setElem, setMapOptions, eventHandler
	} = useUiContext()

	const className = useMemo(() =>
		classNames(
			'App',
			`App_${variant}`,
			isHoverImage ? 'App_hovered' : false,
			isProvenanceOpen ? 'App_active' : false
		)
	, [variant, isHoverImage, isProvenanceOpen])

	useEffect(() => {
		setElem(ref.current)
	}, [setElem])

	useEffect(() => {
		setMapOptions(mapOptions)
	}, [mapOptions, setMapOptions])

	useEffect(() => {
		eventHandler.current = onEvent
	}, [eventHandler, onEvent])

	return (
		<div ref={ref} className={className}>
			<Figure>
				<Media />
				{variant === 'expand' ? <Explainer /> : null}
				<Cutline />
				<Caption />
			</Figure>
			{variant === 'expand' ? <ProvenanceExpand /> : null}
			{variant === 'modal' ? <ProvenanceModal /> : null}
		</div>
	)
}

export default App