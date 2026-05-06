<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

	const { value } = $props()

	const label = $derived(() => value?.label ?? getText($locale, "type", value?.key))
	const definition = $derived(() => value?.definition ?? getText($locale, "type", value?.key, "definition"))
</script>

<Badge
	type="type"
	value={value?.key}
	tooltip={definition()}
	className={classNames("TypeBadge")}
>
	{label()}
</Badge>