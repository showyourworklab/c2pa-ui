<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { getI18nContext } from '$lib/store/i18n.js'

	const {
		thumbnail,
		thumbnailPosition
	} = getContext('uiStoreContext')

	const { locale, getText } = getI18nContext();

</script>

<div
	class={classNames('Thumbnail')}
	style={`left:${$thumbnailPosition?.clientX}px;top:${$thumbnailPosition?.clientY}px`}
>
	{#if $thumbnail}
		<img
			src={$thumbnail}
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