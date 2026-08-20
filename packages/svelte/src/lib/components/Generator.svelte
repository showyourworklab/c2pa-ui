<script lang="ts">
	import { classNames, convertJumbfToDataUri } from 'syw-common/helpers'
	import type { ManifestGeneratorEntry } from 'syw-common/types/c2pa'
	import { getDataContext } from '$lib/store/data.js'

	const { reader } = getDataContext()

	const {
		name,
		icon,
	}: ManifestGeneratorEntry = $props()

	let src: string | null = $state(null)

	$effect(() => {
		let cancelled = false
		src = null
		if(icon?.identifier && icon?.format) {
			convertJumbfToDataUri($reader, icon.identifier, icon.format).then(uri => {
				if(!cancelled) src = uri
			})
		}
		return () => { cancelled = true }
	})
</script>

<div
	class={classNames('Generator')}
>
	{#if src}
		<img
			alt=""
			src={src}
			class={classNames('GeneratorIcon')}
		/>
	{/if}
	<span>
		{name}
	</span>
</div>
