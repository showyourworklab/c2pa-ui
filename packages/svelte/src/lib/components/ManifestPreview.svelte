<script>
	import styles from '$common/css/Manifest.module.scss'
	import { MANIFEST_PREVIEW_TITLE_KEYS } from '$common/constants'
	import { handleA11yClick } from '$common/helpers'
	import { activeManifests } from '$lib/store/ui'

	export let open
	export let index
	export let manifest

	// const thumbnailUrl = manifest ? useThumbnailUrl(manifest?.thumbnail ?? undefined) : null
	const thumbnailUrl = manifest?.thumbnail?.getUrl()?.url

	const handleClick = () => {
		activeManifests.update(values =>
			values.includes(index)
				? values.filter(v => v !== index)
				: [...values, index]
		)
	}

	const handleKeyDown = e => {
		handleA11yClick(e, handleClick)
	}

</script>

<div
	role='button'
	tabindex={0}
	aria-pressed={open}
	class={styles.ManifestPreview}
	on:click={handleClick}
	on:keydown={handleKeyDown}
>
	<div
		class={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_issuer}`}
	>
		{MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
			manifest[key]
		).join(" ")}
	</div>
	<div
		class={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_time}`}
	>
		<span>{manifest?.timestamp ?? ''}</span>
	</div>
	<div
		class={`${styles.ManifestPreviewCell} ${styles.ManifestPreviewCell_thumb}`}
	>
		<img
			src={thumbnailUrl}
			alt=''
		/>
	</div>
</div>