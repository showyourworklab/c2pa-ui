import { classNames } from 'syw-common/helpers'
import type { StatusBadgeProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Badge from './Badge'

const StatusBadge = ({
	value
}: StatusBadgeProps) => {
	const { getText } = useI18nContext()
	const label = getText("status", value)
	return (
		<Badge
			status={value}
			className={classNames("StatusBadge")}
		>
			{label}
		</Badge>
	)
}

export default StatusBadge
