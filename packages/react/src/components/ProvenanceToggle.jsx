import styles from 'syw-common/css/ProvenanceToggle.module.css'
import { useUiContext, useI18nContext } from '$src/context'

const ProvenanceToggle = () => {
	const {
		isOpenProvenance,
		openProvenance,
		closeProvenance
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = event => isOpenProvenance
		? closeProvenance(event)
		: openProvenance(event)

	return (
		<button
			aria-pressed={isOpenProvenance}
			className={styles.ProvenanceToggle}
			onClick={onClick}
		>
			{isOpenProvenance ? getText('toggle', 'provenance') : getText('toggle', 'provenance')}
		</button>
	)
}

export default ProvenanceToggle