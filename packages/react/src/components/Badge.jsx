import { classNames } from 'syw-common/helpers'
import { useI18nContext } from '$src/context/i18n'
import Tooltip from './Tooltip'
import Icon from './Icon'

const Badge = ({
	type,
	status,
	TooltipProps = {},
	children,
	className
}) => {
	const { getText } = useI18nContext()
	const typeLabel = type?.label ?? getText("type", type?.key)
	const typeDefinition = type?.definition ?? getText("type", type?.key, "definition")
	const statusLabel = getText("status", status)
	const statusDefinition = getText("status", status, "definition")
	return (
		<Tooltip
			{...TooltipProps}
			content={typeDefinition}
			ContentProps={{
				...TooltipProps?.ContentProps,
				className: classNames(
					TooltipProps?.ContentProps?.classNames,
					'BadgeTooltipContent',
					type?.key ? `BadgeTooltipContent_${type?.key}` : null,
					status ? `BadgeTooltipContent_${status}` : null
				),
			}}
			className={classNames(
				'BadgeTooltipTrigger',
				TooltipProps?.className,
			)}
		>
			<div
				className={classNames(
					'Badge',
					className,
					type?.key ? `Badge_${type?.key}` : null,
					status ? `Badge_${status}` : null,
				)}
			>
				<Icon
					type={type?.key ?? status}
					className={classNames('BadgeIcon')}
				/>
				<span
					className='syw-hidden'
				>
					{children}
				</span>
			</div>
		</Tooltip>
	)
}

export default Badge