import { classNames } from 'syw-common/helpers'
import ProvenanceToggle from './ProvenanceToggle'
import CutlineBadge from './CutlineBadge';

const Cutline = () => {
	
	return (
		<div
			className={classNames('Cutline')}
		>
			<ProvenanceToggle />
			<CutlineBadge />
		</div>
	)
}

export default Cutline