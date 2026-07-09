<script>
	import { Portal as ArkPortal } from '@ark-ui/svelte/portal'
	import { Tooltip as ArkTooltip } from '@ark-ui/svelte/tooltip'
	import { classNames } from 'syw-common/helpers'

	const {
		content,
		disabled,
		ContentProps = {},
		className,
		children
	} = $props()

</script>

{#if disabled || content === undefined}
	{@render children?.()}
{:else}
	<ArkTooltip.Root
		openDelay={0}
		lazyMount={true}
		unmountOnExit={true}
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
			<ArkTooltip.Positioner
				class={classNames('TooltipPositioner')}
			>
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
{/if}