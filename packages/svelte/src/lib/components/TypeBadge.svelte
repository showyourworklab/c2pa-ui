<script>
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '$lib/store/i18n.js'
    import Badge from './Badge.svelte';

	const { locale, getText } = getI18nContext();

	const { value, status } = $props()

	const label = $derived(() => value?.label ?? getText($locale, "type", value?.key))
	const definition = $derived(() => value?.definition ?? getText($locale, "type", value?.key, "definition"))
</script>

<Badge
	type="type"
	value={value?.key}
	icon={value?.key}
	status={value?.status}
	tooltip={definition()}
	className={classNames(
		"TypeBadge",
		status ? `Badge_status_${status}` : null
	)}
>
	{label()}
</Badge>