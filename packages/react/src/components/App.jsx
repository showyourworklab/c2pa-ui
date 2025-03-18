import { useEffect, useMemo, useRef } from 'react'
import { useC2pa } from '@contentauth/react'

import '$common/css/globals.scss'
import styles from '$common/css/App.module.scss'
import { joinClassNames } from '$common/helpers'
import { prepareManifest } from '$common/helpers/c2pa'
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
import ModalProvenance from './ModalProvenance'

function App({
	onEvent
}) {
	const ref = useRef(null)
	const { src, setManifests } = useDataContext()
	const { locale } = useI18nContext()
	const { variant, isHoverImage, isOpenProvenance, eventHandler } = useUiContext()
	const provenance = useC2pa(src)

	const className = useMemo(() =>
		joinClassNames(
			styles.App,
			styles[`App_${variant}`],
			isHoverImage ? styles.App_hovered : false,
			isOpenProvenance ? styles.App_active : false,
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

	return (
		<div
			ref={ref}
			className={className}
		>
			<Figure>
				<Image />
				{variant === 'expand' ?
					<Explainer />
				: null}
				<Cutline />
				<Caption />
			</Figure>
			{variant === 'expand' ?
				<Collapse
					open={isOpenProvenance}
					className={styles.ModalProvenance}
				>
					<Provenance />
				</Collapse>
			: null}
			{variant === 'modal' ?
				<ModalProvenance />
			: null}
		</div>
	)
}

export default App