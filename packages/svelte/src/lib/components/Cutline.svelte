<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import ProvenanceToggle from './ProvenanceToggle.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
    import TypeBadge from './TypeBadge.svelte';
    import StatusBadge from './StatusBadge.svelte';

	const { status, types } = getContext('dataStoreContext');
</script>

<div
	class={classNames('Cutline')}
>
	<div
		class={classNames('CutlineToggles')}
	>
		<ProvenanceToggle />
		<ExplainerToggle />
	</div>
	<div
		class={classNames('CutlineBadges')}
	>
		<StatusBadge
			value={$status}
		/>
		{#each $types as type}
			<TypeBadge
				value={type}
			/>
		{/each}
	</div>
</div>