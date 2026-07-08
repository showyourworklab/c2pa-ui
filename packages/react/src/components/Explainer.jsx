import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import { useUiContext } from '$src/context/ui'
import Collapse from './Collapse'
import Icon from './Icon'

const Explainer = () => {
	const { getText } = useI18nContext()
	const { isExplainerOpen, closeExplainer } = useUiContext()

	const onCloseClick = closeExplainer

	return (
		<div
			className={classNames('Explainer')}
		>
			<Collapse
				open={isExplainerOpen}
			>
				<div
					className={classNames('ExplainerInner')}
				>
					<div
						className={classNames('ExplainerBox')}
					>
						<div
							className={classNames('ExplainerHeader')}
						>
							<button
								className={classNames('ExplainerClose')}
								aria-pressed={isExplainerOpen}
								aria-label={getText('explainer', 'toggle', 'close')}
								onClick={onCloseClick}
							>
								<Icon
									type="close"
								/>
							</button>
							<p
								className={classNames('ExplainerLede')}
							>
								{getText('explainer', 'lede')}
							</p>
						</div>
						<dl
							className={classNames('ExplainerSections')}
						>
							{[1,2].map(index =>
								<div
									key={index}
									className={classNames('ExplainerSection')}
								>
									<dt
										className={classNames('ExplainerSectionTitle')}
									>
										{getText('explainer', 'section', index, 'title')}
									</dt>
									<dd
										className={classNames('ExplainerSectionBody')}
										dangerouslySetInnerHTML={{
											__html: getText('explainer', 'section', index, 'body')
										}}
									/>
								</div>
							)}
						</dl>
					</div>
				</div>
			</Collapse>
		</div>
	)
}

export default Explainer