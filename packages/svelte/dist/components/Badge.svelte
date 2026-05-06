<script>
	import { classNames } from 'syw-common/helpers'
    import Tooltip from './Tooltip.svelte';
    import Icon from './Icon.svelte';

	const {
		type,
		value,
		icon,
		tooltip,
		TooltipProps = {},
		children,
		className
	} = $props()
</script>

<Tooltip
	{...TooltipProps}
	content={tooltip}
	ContentProps={{
		...TooltipProps?.ContentProps,
		className: classNames(
			TooltipProps?.ContentProps?.classNames,
			'BadgeTooltipContent',
			type ? `BadgeTooltipContent_${type}` : null,
			type && value ? `BadgeTooltipContent_${type}_${value}` : null,
			icon ? `Badge_icon` : null,
		),
	}}
	className={classNames(
		'BadgeTooltipTrigger',
		TooltipProps?.className,
	)}
>
	<span
		class={classNames(
			'Badge',
			className,
			type ? `Badge_${type}` : null,
			type && value ? `Badge_${type}_${value}` : null,
			icon ? 'Badge_icon' : null
		)}
	>
		{#if icon}
			<Icon
				type={icon}
				className={classNames('BadgeIcon')}
			/>
			<span
				class='syw-hidden'
			>
				{@render children?.()}
			</span>
		{:else}
			{@render children?.()}
		{/if}
	</span>
</Tooltip>