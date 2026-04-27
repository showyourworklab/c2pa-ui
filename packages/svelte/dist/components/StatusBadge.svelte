<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
    import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');

	const { value } = $props()
</script>

<Badge
	type="status"
	value={value}
	className={classNames("StatusBadge")}
>
	{getText($locale, "status", value)}
</Badge>