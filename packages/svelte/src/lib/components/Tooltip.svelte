<script>
	import { Portal as ArkPortal } from '@ark-ui/svelte/portal'
	import { Tooltip as ArkTooltip } from '@ark-ui/svelte/tooltip'
	import { classNames } from 'syw-common/helpers'

	const {
		content,
		ContentProps = {},
		className,
		children
	} = $props()

</script>

<ArkTooltip.Root
	openDelay={0}
	lazyMount={true}
	unmountOnExit={false}
	disabled={content === undefined}
>
	<ArkTooltip.Trigger
		class={classNames(
			'TooltipTrigger',
			className,
		)}
	>
		{@render children?.()}
	</ArkTooltip.Trigger>
	<ArkPortal>
		<ArkTooltip.Positioner>
			<ArkTooltip.Content
				{...ContentProps}
				class={classNames(
					'TooltipContent',
					ContentProps?.className,
				)}
			>
				<ArkTooltip.Arrow
					class={classNames('TooltipArrow')}
				>
					<ArkTooltip.ArrowTip
						class={classNames('TooltipArrowTip')}
					/>
				</ArkTooltip.Arrow>
				{content}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	</ArkPortal>
</ArkTooltip.Root>