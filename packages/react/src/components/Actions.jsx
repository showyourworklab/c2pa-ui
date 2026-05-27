import { useEffect, useId, useState } from 'react'
import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
// import { getLangFromLocale } from 'syw-common/helpers/i18n'
const Actions = ({
	actions
}) => {
	const { locale, getText } = useI18nContext()
	console.log(actions)
	return (
		<ul
			className={classNames('Actions')}
		>
			{actions.map((action, index) =>
				<li
					key={index}
					className={classNames('ActionsItem')}
				>
					{getText('action', action)}
				</li>
			)}
		</ul>
	)
}

export default Actions