<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'

	const { src, alt } = getContext('dataStoreContext')
</script>

<div
	class={classNames('Image')}
>
	<img
		src={$src}
		alt={$alt}
		class={classNames('ImageImg')}
	/>
</div>