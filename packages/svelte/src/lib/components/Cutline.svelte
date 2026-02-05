<script>
	import { classNames } from 'syw-common/helpers'
	import ProvenanceToggle from './ProvenanceToggle.svelte'
	import ExplainerToggle from './ExplainerToggle.svelte'
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
</div>