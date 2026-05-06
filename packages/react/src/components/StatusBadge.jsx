import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import Badge from './Badge'

const StatusBadge = ({
	value
}) => {
	const { getText } = useI18nContext()
	const label = getText("status", value)
	const definition = getText("status", value, "definition")
	return (
		<Badge
			type="status"
			icon={value}
			value={value}
			tooltip={definition}
			className={classNames("StatusBadge")}
		>
			{label}
		</Badge>
	)
}

export default StatusBadge