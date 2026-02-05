import { useEffect, useMemo, useRef } from 'react'
import 'syw-common/css/globals.css'
import styles from 'syw-common/css/App.module.css'
import { joinClassNames } from 'syw-common/helpers'
import { prepareManifest } from 'syw-common/helpers/c2pa'
import { useDataContext } from '$src/context/data'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import useC2pa from '$src/hooks/useC2pa'
import Figure from './Figure'
import Image from './Image'
import Cutline from './Cutline'
import Caption from './Caption'
import Explainer from './Explainer'
import Provenance from './Provenance'
import Collapse from './Collapse'
import ProvenanceModal from './ProvenanceModal'
import ImageCompare from './ImageCompare'

function App({
	onEvent
}) {
	const ref = useRef(null)
	const { src, setManifests } = useDataContext()
	const { locale } = useI18nContext()
	const { variant, compareImage, isHoverImage, isOpenProvenance, setElem, eventHandler } = useUiContext()
	const { reader, provenance } = useC2pa(src)

	const className = useMemo(() =>
		joinClassNames(
			styles.App,
			styles[`App_${variant}`],
			isHoverImage ? styles.App_hovered : false,
			isOpenProvenance ? styles.App_active : false,
		)
	, [variant, isHoverImage, isOpenProvenance])

	useEffect(() => {
		setElem(ref.current);
	}, [ref]);

	useEffect(() => {
        const prepareManifests = async () => {
            const newManifests = await Promise.all(
                Object.values(provenance?.manifestStore?.manifests ?? {})
                    .map(manifest => prepareManifest({
						src,
						locale,
						manifest,
						reader
					}))
            )
            setManifests(newManifests)
        }
        prepareManifests()
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
					className={styles.ProvenanceModal}
				>
					<Provenance />
				</Collapse>
			: null}
			{variant === 'modal' ?
				<ProvenanceModal />
			: null}
			{compareImage ?
				<ImageCompare />
			: null}
		</div>
	)
}

export default App