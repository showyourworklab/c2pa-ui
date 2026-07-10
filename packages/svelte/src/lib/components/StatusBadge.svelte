<script>
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '$lib/store/i18n.js'
    import Badge from './Badge.svelte';

	const { locale, getText } = getI18nContext();

	const { value } = $props()
	const label = $derived(() => getText($locale, "status", value))
	const definition = $derived(() => getText($locale, "status", value, "definition"))
</script>

<Badge
	type="status"
	value={value}
	icon={value}
	tooltip={definition()}
	className={classNames("StatusBadge")}
>
	{label()}
</Badge>