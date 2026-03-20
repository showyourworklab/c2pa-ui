import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'

const Status = ({
	value
}) => {
	const { getText } = useI18nContext()
	
	return (
		<div
			className={classNames(
				'Status',
				value ? `Status_${value}` : null
			)}
		>
			{getText("status", value)}
		</div>
	)
}

export default Status