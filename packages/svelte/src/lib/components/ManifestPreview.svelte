<script>
	import { getContext } from 'svelte';
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_PREVIEW_TITLE_KEYS } from 'syw-common/constants'
	import { handleA11yClick } from 'syw-common/helpers'
	import { getDateString } from 'syw-common/helpers/i18n'
    import Badge from './Badge.svelte';
    import ManifestContentTabsToggle from './ManifestContentTabsToggle.svelte';

	const {
		manifest,
		tabKeys,
		open,
	} = $props()

	const { locale, getText } = getContext('i18nStoreContext');
	const {
		openManifest, closeManifest, updateThumbnailPosition, openThumbnail, closeThumbnail, addThumbnail, removeThumbnail
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

	// const handleThumbnailMouseMove = event => {
	// 	updateThumbnailPosition(event)
	// }
	// const handleThumbnailMouseEnter = event => {
	// 	openThumbnail(event)
	// 	addThumbnail(manifest?.thumbnail, event)
	// }
	// const handleThumbnailMouseLeave = event => {
	// 	closeThumbnail(event)
	// 	removeThumbnail(event)
	// }

</script>

<div
	class={classNames('ManifestPreview')}
>
	<div
		role='button'
		tabindex={0}
		aria-pressed={open}
		class={classNames('ManifestPreviewToggle')}
		onclick={handleClick}
		onkeydown={handleKeyDown}
	>
		<div
			class={classNames('ManifestPreviewBadge')}
		>
			<Badge
				type={manifest.type}
				status={manifest.status}
			/>
		</div>
		<div
			class={classNames('ManifestPreviewCells')}
		>
			<div
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_issuer'
				)}
			>
				{manifest.type?.key
					? getText($locale, 'type', manifest.type?.key)
					: MANIFEST_PREVIEW_TITLE_KEYS.filter(key => manifest[key]).map(key =>
						manifest[key]
					).join(" ")}
			</div>
			<div
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_time'
				)}
			>
				<span>{getDateString($locale, manifest?.timestamp) ?? ''}</span>
			</div>
			<div
				// role='button'
				// tabindex={0}
				class={classNames(
					'ManifestPreviewCell',
					'ManifestPreviewCell_thumb'
				)}
				// onmousemove={handleThumbnailMouseMove}
				// onmouseenter={handleThumbnailMouseEnter}
				// onmouseleave={handleThumbnailMouseLeave}
			>
				{#if manifest?.thumbnail}
					<img
						src={manifest?.thumbnail}
						alt=''
					/>
				{/if}
			</div>
		</div>
	</div>
	<ManifestContentTabsToggle
		keys={tabKeys}
		manifest={manifest}
		class={classNames('ManifestPreviewTabsToggle')}
	/>
</div>