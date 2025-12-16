import styles from 'syw-common/css/Cutline.module.css'
import ProvenanceToggle from './ProvenanceToggle'
import ExplainerToggle from './ExplainerToggle'

const Cutline = ({
	caption,
	byline
}) => {
	return (
		<div
			className={styles.Cutline}
		>
			<div
				className={styles.CutlineToggles}
			>
				<ProvenanceToggle />
				<ExplainerToggle />
			</div>
		</div>
	)
}

export default Cutline