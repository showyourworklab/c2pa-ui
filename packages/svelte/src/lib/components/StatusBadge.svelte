<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

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