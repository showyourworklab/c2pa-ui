import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'
import Status from './Status'

const Cutline = () => {
	const {
		status
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
			<Status
				value={status}
			/>
		</div>
	)
}

export default Cutline