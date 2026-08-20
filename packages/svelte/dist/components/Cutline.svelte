<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import ProvenanceToggle from './ProvenanceToggle.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
    // import Badge from './Badge.svelte';
	import { getDataContext } from '../store/data.js'

	const { status, types } = getDataContext();
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
	<!-- <div
		class={classNames('CutlineBadges')}
	>
		<Badge
			status={$status}
			type={$types[0]}
		/>
	</div> -->
</div>
