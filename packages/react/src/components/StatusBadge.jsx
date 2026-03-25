import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import Badge from './Badge'

const StatusBadge = ({
	value
}) => {
	const { getText } = useI18nContext()
	
	return (
		<Badge
			type="status"
			value={value}
			className={classNames("StatusBadge")}
		>
			{getText("status", value)}
		</Badge>
	)
}

export default StatusBadge