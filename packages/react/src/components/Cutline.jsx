import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'
import StatusBadge from './StatusBadge'
import TypeBadge from './TypeBadge'

const Cutline = () => {
	const {
		status,
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
				<StatusBadge
					value={status}
				/>
				{/* <TypeBadge
					value={type}
				/> */}
			</div>
		</div>
	)
}

export default Cutline