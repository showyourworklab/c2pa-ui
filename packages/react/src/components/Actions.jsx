import { useEffect, useId, useState } from 'react'
import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
// import { getLangFromLocale } from 'syw-common/helpers/i18n'
const Actions = ({
	actions
}) => {
	const { locale, getText } = useI18nContext()
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