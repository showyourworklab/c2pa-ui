import { classNames } from 'syw-common/helpers'
import Tooltip from './Tooltip'

const Badge = ({
	type,
	value,
	tooltip,
	TooltipProps,
	children,
	className
}) => {
	return (
		<Tooltip
			{...TooltipProps}
			content={tooltip}
			ContentProps={{
				...TooltipProps?.ContentProps,
				className: classNames(
					TooltipProps?.ContentProps?.classNames,
					'BadgeTooltipContent',
					type ? `BadgeTooltipContent_${type}` : null,
					type && value ? `BadgeTooltipContent_${type}_${value}` : null
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
					type ? `Badge_${type}` : null,
					type && value ? `Badge_${type}_${value}` : null
				)}
			>
				{children}
			</div>
		</Tooltip>
	)
}

export default Badge