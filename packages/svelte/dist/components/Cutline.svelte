<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import ProvenanceToggle from './ProvenanceToggle.svelte'
</script>

<div
	class={classNames('Cutline')}
>
	<div
		class={classNames('CutlineToggles')}
	>
		<ProvenanceToggle />
	</div>
</div>
