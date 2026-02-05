<script>
	import { getContext } from 'svelte'
	import Collapse from './Collapse.svelte'
	import Provenance from './Provenance.svelte'

	const {
		isProvenanceOpen,
	} = getContext('uiStoreContext')
</script>

<Collapse
	open={isProvenanceOpen}
>
	<Provenance />
</Collapse>