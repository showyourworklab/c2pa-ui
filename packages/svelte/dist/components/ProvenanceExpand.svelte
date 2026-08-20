<script lang="ts">
	import Collapse from './Collapse.svelte'
	import Provenance from './Provenance.svelte'
	import { getUiContext } from '../store/ui.js'

	const {
		isProvenanceOpen,
	} = getUiContext()
</script>

<Collapse
	open={$isProvenanceOpen}
>
	<Provenance />
</Collapse>
