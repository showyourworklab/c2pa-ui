<script>
	import {
		Collapsible as ArkCollapsible,
		useCollapsible as useArkCollapsible
	} from '@ark-ui/svelte/collapsible'
	import { classNames } from 'syw-common/helpers'

	const id = $props.id();
	const { open, children } = $props();
	const arkCollapsible = useArkCollapsible(() => ({ id, open }))

	const classes = $derived(
		classNames(
			'Collapse',
			open ? 'Collapse_open' : false
		)
	)
</script>

<ArkCollapsible.RootProvider
	id={id}
	class={classes}
	value={arkCollapsible}
	aria-expanded={open}
>
	<ArkCollapsible.Content
		class={classNames('CollapseInner')}
	>
		{@render children()}
	</ArkCollapsible.Content>
</ArkCollapsible.RootProvider>