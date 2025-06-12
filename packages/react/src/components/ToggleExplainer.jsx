import styles from '@syw/common/css/ToggleExplainer.module.scss'
import { useUiContext, useI18nContext } from '$src/context'

const ToggleExplainer = () => {
	const {
		isOpenExplainer,
		openExplainer,
		closeExplainer,
	} = useUiContext()
	const { getText } = useI18nContext()

	const onClick = event => isOpenExplainer
		? closeExplainer(event)
		: openExplainer(event)

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