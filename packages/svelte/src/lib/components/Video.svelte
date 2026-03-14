<script>
	import { onMount, getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'

	let mounted = $state(false);
	const { src, alt } = getContext('dataStoreContext')

	onMount(async () => {
		await import('@videojs/html/video/player');
		await import('@videojs/html/video/skin');
		await import('@videojs/html/video/skin.css');
		mounted = true;
	});

</script>

<div
	class={classNames('Video')}
>
	{#if mounted}
		<video-player>
			<video-skin
				class={classNames('VideoSkin')}
			>
				<!-- svelte-ignore a11y_media_has_caption -->
				<video
					src={$src}
					title={$alt}
					slot="media"
					class={classNames('VideoVideo')}
				>
					<!-- <track kind="captions"> -->
				</video>
			</video-skin>
		</video-player>
	{/if}
</div>