import styles from 'syw-common/css/Cutline.module.css'
import ToggleProvenance from './ToggleProvenance'
import ToggleExplainer from './ToggleExplainer'

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
				<ToggleProvenance />
				<ToggleExplainer />
			</div>
		</div>
	)
}

export default Cutline