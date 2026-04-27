<script>
	import { classNames } from 'syw-common/helpers'

	const { type, value, children, className } = $props()
</script>

<div
	class={classNames(
		'Badge',
		className,
		type ? `Badge_${type}` : null,
		value ? `Badge_${value}` : null
	)}
>
	{@render children?.()}
</div>