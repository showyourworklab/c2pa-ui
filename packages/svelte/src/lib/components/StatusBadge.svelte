<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { StatusBadgeProps } from 'syw-common/types/components'
	import { getI18nContext } from '$lib/store/i18n.js'
    import Badge from './Badge.svelte';

	const { locale, getText } = getI18nContext();

	const { value }: StatusBadgeProps = $props()
	const label = $derived(getText($locale, "status", value))
</script>

<Badge
	status={value}
	className={classNames("StatusBadge")}
>
	{label}
</Badge>
