import { classNames } from 'syw-common/helpers'
import { useI18nContext, useDataContext, useUiContext } from '$src/context'
import Badge from './Badge'

const ProvenanceToggle = () => {
	const { getText } = useI18nContext()
	const { status, types } = useDataContext()
	const { isProvenanceOpen, openProvenance, closeProvenance } = useUiContext()

	const onClick = event => isProvenanceOpen
		? closeProvenance(event)
		: openProvenance(event)

	return (
		<button
			aria-pressed={isProvenanceOpen}
			className={classNames('ProvenanceToggle')}
			onClick={onClick}
		>
			<Badge
				// type={types[0]}
				status={status}
				TooltipProps={{
					disabled: true
				}}
			/>
			<span>
				{isProvenanceOpen ? getText('provenance', 'toggle') : getText('provenance', 'toggle')}
			</span>
		</button>
	)
}

export default ProvenanceToggle