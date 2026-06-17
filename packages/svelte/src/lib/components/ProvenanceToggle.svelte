<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import Badge from './Badge.svelte';

	const { locale, getText } = getContext('i18nStoreContext');
	const { status, types } = getContext('dataStoreContext');
	const { isProvenanceOpen, openProvenance, closeProvenance } = getContext('uiStoreContext');

	const handleClick = (event) => {
		if($isProvenanceOpen) {
			closeProvenance(event)
		} else {
			openProvenance(event)
		}
	}

</script>

<button
	aria-pressed={true}
	class={classNames('ProvenanceToggle')}
	onclick={handleClick}
>
	<Badge
		status={$status}
		// type={$types[0]}
		TooltipProps={{
			disabled: true
		}}
	/>
	<span>
		{$isProvenanceOpen ? getText($locale, 'provenance', 'toggle') : getText($locale, 'provenance', 'toggle')}
	</span>
</button>