<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	const {
		compareImage,
		comparePosition
	} = getContext('uiStoreContext')
</script>

<div
	class={classNames('ImageCompare')}
	style={`left:${$comparePosition?.clientX}px;top:${$comparePosition?.clientY}px`}
>
	<img
		src={$compareImage?.value}
		alt={""}
		class={classNames('ImageCompareImg')}
	/>
</div>