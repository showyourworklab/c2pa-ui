<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import Badge from './Badge.svelte';
	import { getDataContext } from '../store/data.js'
	import { getI18nContext } from '../store/i18n.js'
	import { getUiContext } from '../store/ui.js'

	const { locale, getText } = getI18nContext();
	const { status, types } = getDataContext();
	const { isProvenanceOpen, openProvenance, closeProvenance } = getUiContext();

	const handleClick = (event: MouseEvent) => {
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

</script>

<button
	aria-pressed={$isProvenanceOpen}
	class={classNames('ProvenanceToggle')}
	onclick={handleClick}
>
	<Badge
		status={$status}
		TooltipProps={{
			disabled: true
		}}
	/>
	<span>
		{$isProvenanceOpen ? getText($locale, 'provenance', 'toggle') : getText($locale, 'provenance', 'toggle')}
	</span>
</button>
