import styles from 'syw-common/css/ToggleExplainer.module.css'
import { useUiContext, useI18nContext } from '$src/context'

const ToggleExplainer = () => {
	const {
		variant,
		isOpenExplainer,
		openExplainer,
		closeExplainer,
		openProvenance
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = event => {
		// Toggle explainer based on current state
		if(isOpenExplainer) {
			closeExplainer(event)
		} else {
			openExplainer(event)
		}
		// If modal, also open provenance modal to view explainer
		if(variant === "modal") {
			openProvenance(event)
		}
	}

	return (
		<button
			className={styles.ToggleExplainer}
			aria-pressed={isOpenExplainer}
			onClick={onClick}
		>
			{getText('toggle', 'explain')}
		</button>
	)
}

export default ToggleExplainer