import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers'
import Badge from './Badge'
import Icon from './Icon'

const TypeBadge = ({
	value,
	status
}) => {
	const { getText } = useI18nContext()
	const label = value?.label ?? getText("type", value?.key)
	const definition = value?.definition ?? getText("type", value?.key, "definition")
	return (
		<Badge
			type="type"
			icon={value?.key}
			value={value?.key}
			status={value?.status}
			tooltip={definition}
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