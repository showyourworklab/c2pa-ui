import type { MouseEvent } from 'react'
import { classNames } from 'syw-common/helpers'
import { useI18nContext, useDataContext, useUiContext } from '$src/context'
import Badge from './Badge'
import Icon from './Icon'

const ProvenanceToggle = () => {
	const { getText } = useI18nContext()
	const { status } = useDataContext()
	const { isProvenanceOpen, openProvenance, closeProvenance } = useUiContext()

	const onClick = (event: MouseEvent<HTMLButtonElement>) => isProvenanceOpen
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
			<Icon
				type={isProvenanceOpen ? "up" : "down"}
			/>
		</button>
	)
}

export default ProvenanceToggle