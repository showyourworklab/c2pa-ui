import type { ActionsProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers'

const Actions = ({
	actions
}: ActionsProps) => {
	const { getText } = useI18nContext()
	return (
		<div
			className={classNames('Actions')}
		>
			<ul
				className={classNames('ActionsList')}
			>
				{actions.map((action, index) =>
					<li
						key={index}
						className={classNames('ActionsListItem')}
					>
						{getText('action', action)}
					</li>
				)}
			</ul>
		</div>
	)
}

export default Actions