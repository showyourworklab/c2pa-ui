import { classNames } from 'syw-common/helpers'
import type { TypeBadgeProps } from 'syw-common/types/components'
import { useI18nContext } from '$src/context/i18n'
import Badge from './Badge'

const TypeBadge = ({
	value,
	status,
	showLabel
}: TypeBadgeProps) => {
	const { getText } = useI18nContext()
	const label = getText("type", value?.key ?? '')
	return (
		<Badge
			type={value}
			status={status}
			showLabel={showLabel}
			className={classNames(
				"TypeBadge",
				status ? `Badge_status_${status}` : null
			)}
		>
			{label}
		</Badge>
	)
}

export default TypeBadge
