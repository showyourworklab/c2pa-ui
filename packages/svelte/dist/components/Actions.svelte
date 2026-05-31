<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

	const { actions } = $props()
	const { locale, getText } = getContext('i18nStoreContext')
</script>

<ul
	class={classNames('Actions')}
>
	{#each actions as action}
		<li
			class={classNames('ActionsItem')}
		>
			{getText($locale, 'action', action)}
		</li>
	{/each}
</ul>