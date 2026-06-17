import { Tooltip as ArkTooltip } from '@ark-ui/react/tooltip'
import { Portal as ArkPortal } from '@ark-ui/react/portal'
import { classNames } from 'syw-common/helpers'

const Tooltip = ({
	content,
	disabled,
	ContentProps = {},
	children,
	className
}) => {
	if (disabled || content === undefined) return children;
	return (
		<ArkTooltip.Root
			openDelay={0}
			lazyMount={true}
			unmountOnExit={true}
		>
			<ArkTooltip.Trigger
				className={classNames(
					'TooltipTrigger',
					className,
				)}
			>
				{children}
			</ArkTooltip.Trigger>
			<ArkPortal>
				<ArkTooltip.Positioner
					className={classNames('TooltipPositioner')}
				>
					<ArkTooltip.Content
						{...ContentProps}
						className={classNames(
							'TooltipContent',
							ContentProps?.className,
						)}
					>
						<ArkTooltip.Arrow
							className={classNames('TooltipArrow')}
						>
							<ArkTooltip.ArrowTip
								className={classNames('TooltipArrowTip')}
							/>
						</ArkTooltip.Arrow>
						{content}
					</ArkTooltip.Content>
				</ArkTooltip.Positioner>
			</ArkPortal>
		</ArkTooltip.Root>
	)
}

export default Tooltip