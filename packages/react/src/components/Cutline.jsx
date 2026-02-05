import { classNames } from 'syw-common/helpers'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'

const Cutline = ({
	caption,
	byline
}) => {
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
		</div>
	)
}

export default Cutline