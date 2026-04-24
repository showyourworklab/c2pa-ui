import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'
import StatusBadge from './StatusBadge'
import TypeBadge from './TypeBadge'

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
				<StatusBadge
					value={status}
				/>
				{types.map((type, index) =>
					<TypeBadge
						key={index}
						value={type}
					/>
				)}
			</div>
		</div>
	)
}

export default Cutline