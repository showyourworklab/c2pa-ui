import { useContext, useCallback, useEffect, useMemo, useRef, useState, createContext } from 'react'
import { useC2pa } from '@contentauth/react'
import { selectEditsAndActivity } from 'c2pa'

import '$src/globals.scss'
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

function App() {
	const ref = useRef(null)
	const { src, manifests, setManifests } = useDataContext()
	const { locale } = useI18nContext()
	const { isHoverImage, isShowProvenance } = useUiContext()

	const provenance = useC2pa(src)

	const verifyUrl = useMemo(() => {
		const lastManifest = manifests.at(-1)
		const imageUrl = `${window.location.origin}${src}`
		return `https://verify.contentauthenticity.org/inspect?source=${imageUrl}`
	}, [src, manifests])

	const hasManifests = useMemo(() =>
		manifests && manifests.length
	, [manifests])
	
	useEffect(() => {
		const manifestStore = provenance?.manifestStore
		const newManifests = Object.values(manifestStore?.manifests ?? {})
			.map(manifest => prepareManifest(locale, manifest))
		setManifests(newManifests)
	}, [locale, provenance])

	const className = useMemo(() =>
		joinClassNames(
			styles.App,
			isHoverImage ? styles.App_hovered : false,
			isShowProvenance ? styles.App_active : false
		)
	, [isHoverImage, isShowProvenance])

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
				open={isShowProvenance}
			>
				<Provenance
					src={src}
				/>
			</Collapse>
		</div>
	)
}

export default App