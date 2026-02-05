import { classNames } from 'syw-common/helpers'
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
			className={classNames('ProvenanceToggle')}
			onClick={onClick}
		>
			{isOpenProvenance ? getText('toggle', 'provenance') : getText('toggle', 'provenance')}
		</button>
	)
}

export default ProvenanceToggle