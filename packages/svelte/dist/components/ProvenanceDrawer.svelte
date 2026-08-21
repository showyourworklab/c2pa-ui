<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
	import Drawer from './Drawer.svelte'
	import Provenance from './Provenance.svelte'

	const {
		direction
	} = $props()
	
	const {
		isProvenanceOpen,
		openProvenance,
		closeProvenance,
		closeExplainer
	} = getContext('uiStoreContext')
	const { locale, getText } = getContext('i18nStoreContext')

	const handleOpenChange = (newOpen, event) => {
		const originalEvent = event
		if(newOpen) {
			openProvenance(originalEvent)
		} else {
			closeProvenance(originalEvent)
			closeExplainer(originalEvent)
		}
	}

</script>

<Drawer
	open={$isProvenanceOpen}
	title={getText($locale, 'provenance', 'toggle')}
	direction={direction}
	onOpenChange={handleOpenChange}
	className={classNames('ProvenanceDrawer')}
>
	<Provenance />
</Drawer>