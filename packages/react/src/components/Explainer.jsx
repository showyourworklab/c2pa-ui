import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'

const Explainer = () => {
	const { getText } = useI18nContext()
	const {
		isOpenExplainer,
		closeExplainer
	} = useUiContext()

	const onCloseClick = closeExplainer

	return (
		<div
			className={classNames('Explainer')}
		>
			<Collapse
				open={isOpenExplainer}
			>
				<div
					className={classNames('ExplainerInner')}
				>
					<button
						className={classNames('ExplainerClose')}
						aria-pressed={isOpenExplainer}
						onClick={onCloseClick}
					>
						{getText('toggle', 'explain', 'close')}
					</button>
					<div>
						<strong>
							Consectetur adipiscing elit
						</strong>
					</div>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris enim nibh, rhoncus vel enim ac, luctus efficitur risus. Quisque viverra tellus vitae arcu consectetur tincidunt. Ut vel pharetra tellus. Nam posuere suscipit maximus.</p>
					<div>
						<strong>
							Cras sagittis erat
						</strong>
					</div>
					<p>Suspendisse a neque nulla. Cras sagittis erat sed elit tristique, a efficitur ante malesuada. Quisque dapibus pharetra dictum.</p>
					<div
						className={classNames('ExplainerMore')}
					>
						{getText('explainer', 'methods', 'pre')}&nbsp;
						<a
							href={getText('explainer', 'methods', 'url')}
							// target='_blank'
							// rel='noreferrer noopener'
						>
							{getText('explainer', 'methods', 'link')}
						</a>
					</div>
				</div>
			</Collapse>
		</div>
	)
}

export default Explainer