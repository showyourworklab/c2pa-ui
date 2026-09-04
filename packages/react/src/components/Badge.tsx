import { classNames } from 'syw-common/helpers'
import type { BadgeProps } from 'syw-common/types/components'
import Tooltip from './Tooltip'
import type { TooltipProps } from './Tooltip'
import Icon from './Icon'

interface ReactBadgeProps extends BadgeProps {
	TooltipProps?: Omit<TooltipProps, 'children'>
}

const Badge = ({
	type,
	status,
	showLabel,
	TooltipProps: tooltipProps = {},
	children,
	className
}: ReactBadgeProps) => {
	return (
		<Tooltip
			{...tooltipProps}
			ContentProps={{
				...tooltipProps?.ContentProps,
				className: classNames(
					tooltipProps?.ContentProps?.className,
					'BadgeTooltipContent',
					type?.key ? `BadgeTooltipContent_${type?.key}` : null,
					status ? `BadgeTooltipContent_${status}` : null,
				),
			}}
			className={classNames(
				'BadgeTooltipTrigger',
				tooltipProps?.className,
			)}
		>
			<span
				className={classNames(
					'Badge',
					className,
					type?.key ? `Badge_${type?.key}` : null,
					status ? `Badge_${status}` : null,
					showLabel ? 'Badge_showLabel' : null
				)}
			>
				<div
					className={classNames('BadgeCircle')}
				>
					<Icon
						type={type?.key ?? status}
						className={classNames('BadgeIcon')}
					/>
				</div>
				<span
					className={classNames(
						'BadgeLabel',
						!showLabel ? 'syw-hidden' : null
					)}
				>
					{children}
				</span>
			</span>
		</Tooltip>
	)
}

export default Badge
