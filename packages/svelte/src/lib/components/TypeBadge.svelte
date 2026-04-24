<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

	const { value } = $props()
	const label = $derived(() => value?.label ?? getText(locale, "type", value))
</script>

<Badge
	type="type"
	value={value?.key}
	className={classNames("TypeBadge")}
>
	{label()}
</Badge>