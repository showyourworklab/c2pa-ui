<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

	const { actions } = $props()
	const { locale, getText } = getContext('i18nStoreContext')
</script>

<div
	class={classNames('Actions')}
>
	<ul
		class={classNames('ActionsList')}
	>
		{#each actions as action}
			<li
				class={classNames('ActionsListItem')}
			>
				{getText($locale, 'action', action)}
			</li>
		{/each}
	</ul>
</div>