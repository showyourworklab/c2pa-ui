<script lang="ts">
	import type { Snippet } from 'svelte'
	import {
		Collapsible as ArkCollapsible,
		useCollapsible as useArkCollapsible
	} from '@ark-ui/svelte/collapsible'
	import type { UseCollapsibleProps } from '@ark-ui/svelte/collapsible'
	import { classNames } from 'syw-common/helpers'
	import type { CollapseProps } from 'syw-common/types/components'

	const id = $props.id();
	const { open, children }: Pick<CollapseProps, 'open'> & { children: Snippet } = $props();
	// Cast needed: @ark-ui/svelte's UseCollapsibleProps doesn't resolve cleanly
	// against a plain { id, open } object literal despite both being valid fields.
	const arkCollapsible = useArkCollapsible(() => ({ id, open }) as UseCollapsibleProps)

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
