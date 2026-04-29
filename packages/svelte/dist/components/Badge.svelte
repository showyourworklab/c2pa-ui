<script>
	import { classNames } from 'syw-common/helpers'
    import Tooltip from './Tooltip.svelte';

	const {
		type,
		value,
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
			type && value ? `BadgeTooltipContent_${type}_${value}` : null
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
			type && value ? `Badge_${type}_${value}` : null
		)}
	>
		{@render children?.()}
	</span>
</Tooltip>