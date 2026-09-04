<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { getDataContext } from '$lib/store/data.js'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'
	import Badge from './Badge.svelte';
    import Icon from './Icon.svelte';

	const { locale, getText } = getI18nContext();
	const { status } = getDataContext();
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
	<Icon
		type={isProvenanceOpen ? "up" : "down"}
	/>
</button>
