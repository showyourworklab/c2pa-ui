<script>
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '$lib/store/i18n.js'
    import Tooltip from './Tooltip.svelte'
    import Icon from './Icon.svelte'

	const {
		type,
		status,
		TooltipProps = {},
		children,
		className
	} = $props()
	const { locale, getText } = getI18nContext();
	const typeLabel = $derived(() => type?.label ?? getText($locale, "type", type?.key))
	const typeDefinition = $derived(() => type?.definition ?? getText($locale, "type", type?.key, "definition"))
	const statusLabel = $derived(() => getText($locale, "status", status))
	const statusDefinition = $derived(() => getText($locale, "status", status, "definition"))
</script>

<Tooltip
	{...TooltipProps}
	// content={typeDefinition()}
	ContentProps={{
		...TooltipProps?.ContentProps,
		className: classNames(
			TooltipProps?.ContentProps?.classNames,
			'BadgeTooltipContent',
			type?.key ? `BadgeTooltipContent_${type?.key}` : null,
			status ? `BadgeTooltipContent_${status}` : null,
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
			type?.key ? `Badge_${type?.key}` : null,
			status ? `Badge_${status}` : null,
		)}
	>
		<Icon
			type={type?.key ?? status}
			className={classNames('BadgeIcon')}
		/>
		<span
			class='syw-hidden'
		>
			{@render children?.()}
		</span>
	</span>
</Tooltip>