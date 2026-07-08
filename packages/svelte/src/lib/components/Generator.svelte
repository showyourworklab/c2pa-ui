<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
	import { convertJumbfToDataUri } from 'syw-common/helpers'

	const { reader } = getContext('dataStoreContext')

	const {
		name,
		icon,
	} = $props()

	let src = $state(null)

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
