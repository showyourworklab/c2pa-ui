import { classNames } from 'syw-common/helpers'
import { useUiContext, useI18nContext } from '$src/context'

const ProvenanceToggle = () => {
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = event => isProvenanceOpen
		? closeProvenance(event)
		: openProvenance(event)

	return (
		<button
			aria-pressed={isProvenanceOpen}
			className={classNames('ProvenanceToggle')}
			onClick={onClick}
		>
			{isProvenanceOpen ? getText('provenance', 'toggle') : getText('provenance', 'toggle')}
		</button>
	)
}

export default ProvenanceToggle