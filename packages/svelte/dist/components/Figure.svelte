<script>
	import { classNames } from 'syw-common/helpers'

	const { children } = $props()
</script>

<figure
	class={classNames('Figure')}
>
	{@render children()}
</figure>