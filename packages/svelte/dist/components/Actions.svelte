<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import type { ActionsProps } from 'syw-common/types/components'
	import { getI18nContext } from '../store/i18n.js'

	const { actions }: ActionsProps = $props()
	const { locale, getText } = getI18nContext()
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