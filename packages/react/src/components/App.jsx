import { useEffect, useMemo, useRef } from 'react'
import { useC2pa } from '@contentauth/react'

import styles from '@syw/common/css/App.module.scss'
import { joinClassNames } from '@syw/common/helpers'
import { prepareManifest } from '@syw/common/helpers/c2pa'
import { useDataContext } from '$src/context/data'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Figure from './Figure'
import Image from './Image'
import Cutline from './Cutline'
import Caption from './Caption'
import Explainer from './Explainer'
import Provenance from './Provenance'
import Collapse from './Collapse'
import '$src/globals.scss'

function App({
	onEvent
}) {
	const ref = useRef(null)
	const { src, setManifests } = useDataContext()
	const { locale } = useI18nContext()
	const { isHoverImage, isOpenProvenance, eventHandler } = useUiContext()
	const provenance = useC2pa(src)

	const className = useMemo(() =>
		joinClassNames(
			styles.App,
			isHoverImage ? styles.App_hovered : false,
			isOpenProvenance ? styles.App_active : false
		)
	, [isHoverImage, isOpenProvenance])

	useEffect(() => {
		const manifestStore = provenance?.manifestStore
		const newManifests = Object.values(manifestStore?.manifests ?? {})
			.map(manifest => prepareManifest(locale, manifest))
		setManifests(newManifests)
	}, [locale, provenance])

	useEffect(() => {
		eventHandler.current = onEvent
	}, [eventHandler, onEvent])

	// useEffect(() => {
	// 	const time = new Date();
	// 	if(onProvenanceToggle) onProvenanceToggle(isOpenProvenance, ref.current, time)
	// }, [isOpenProvenance, ref])

	return (
		<div
			ref={ref}
			className={className}
		>
			<Figure>
				<Image />
				<Explainer />
				<Cutline />
				<Caption />
			</Figure>
			<Collapse
				open={isOpenProvenance}
			>
				<Provenance />
			</Collapse>
		</div>
	)
}

export default App