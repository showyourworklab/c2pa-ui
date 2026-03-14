<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	
	const {
		thumbnail,
		thumbnailPosition
	} = getContext('uiStoreContext')

	const { locale, getText } = getContext('i18nStoreContext');

</script>

<div
	class={classNames('Thumbnail')}
	style={`left:${$thumbnailPosition?.clientX}px;top:${$thumbnailPosition?.clientY}px`}
>
	{#if $thumbnail?.value}
		<img
			src={$thumbnail?.value}
			alt={""}
			class={classNames('ThumbnailImg')}
		/>
	{:else}
		<div
			class={classNames('ThumbnailMissing')}
		>
			{getText($locale, 'thumbnail', 'missing')}
		</div>
	{/if}
</div>