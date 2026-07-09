<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

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