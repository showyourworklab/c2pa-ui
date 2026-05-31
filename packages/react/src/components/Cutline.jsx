import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'
import Badge from './Badge'

const Cutline = () => {
	const {
		status,
		types
	} = useDataContext()
	return (
		<div
			className={classNames('Cutline')}
		>
			<div
				className={classNames('CutlineToggles')}
			>
				<ProvenanceToggle />
				<ExplainerToggle />
			</div>
			<div
				className={classNames('CutlineBadges')}
			>
				<Badge
					type={types[0]}
					status={status}
				/>
			</div>
		</div>
	)
}

export default Cutline