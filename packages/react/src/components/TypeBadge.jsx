import { useI18nContext } from '$src/context/i18n'
import { classNames } from 'syw-common/helpers'
import Badge from './Badge'

const TypeBadge = ({
	value
}) => {
	const { getText } = useI18nContext()
	const label = value?.label ?? getText("type", value)
	return (
		<Badge
			type="type"
			value={value?.key}
			className={classNames("TypeBadge")}
		>
			{label}
		</Badge>
	)
}

export default TypeBadge