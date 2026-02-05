<script>
	import { getContext } from 'svelte';
	// import styles from 'syw-common/css/Manifest.module.css'
	import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
	import { handleA11yClick } from 'syw-common/helpers'
	import { getDateString } from 'syw-common/helpers/i18n'

	const {
		open,
		manifest
	} = $props()

	const { locale } = getContext('i18nStoreContext');
	const {
		openManifest, closeManifest, updateComparePosition, addCompareImage, removeCompareImage
	} = getContext('uiStoreContext');

	const handleClick = (event => {
		if(open) {
			closeManifest(event, manifest)
		} else {
			openManifest(event, manifest)
		}
	})

	const handleKeyDown = event => {
		handleA11yClick(event, handleClick)
	}

	const handleThumbnailMouseMove = event => {
		updateComparePosition(event)
	}
	const handleThumbnailMouseEnter = event => {
		addCompareImage(manifest?.thumbnail, event)
	}
	const handleThumbnailMouseLeave = event => {
		removeCompareImage(event)
	}

</script>

<div
	role='button'
	tabindex={0}
	aria-pressed={open}
	class='ManifestPreview'
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	<div
		class='ManifestPreviewCell ManifestPreviewCell_issuer'
	>
		{MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
			manifest[key]
		).join(" ")}
	</div>
	<div
		class='ManifestPreviewCell ManifestPreviewCell_time'
	>
		<span>{getDateString($locale, manifest?.timestamp) ?? ''}</span>
	</div>
	<div
		role='button'
		tabindex={0}
		class='ManifestPreviewCell ManifestPreviewCell_thumb'
		onmousemove={handleThumbnailMouseMove}
		onmouseenter={handleThumbnailMouseEnter}
		onmouseleave={handleThumbnailMouseLeave}
	>
		<img
			src={manifest?.thumbnail}
			alt=''
		/>
	</div>
</div>