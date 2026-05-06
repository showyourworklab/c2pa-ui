import { classNames } from 'syw-common/helpers'
import Tooltip from './Tooltip'
import Icon from './Icon'

const Badge = ({
	type,
	value,
	icon,
	tooltip,
	TooltipProps = {},
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
					type && value ? `Badge_${type}_${value}` : null,
					icon ? `Badge_icon` : null,
				)}
			>
				{icon ?
					<>
						<Icon
							type={icon}
							className={classNames('BadgeIcon')}
						/>
						<span
							className='syw-hidden'
						>
							{children}
						</span>
					</>
				: children}
			</div>
		</Tooltip>
	)
}

export default Badge