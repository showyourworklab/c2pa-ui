<script>
	import { classNames } from 'syw-common/helpers'
	import { MANIFEST_PRIMARY_KEYS, MANIFEST_SECONDARY_KEYS } from 'syw-common/constants'
	import ManifestTable from './ManifestTable.svelte'

	const {
		manifest = {}
	} = $props()
</script>

<div
	class={classNames('ManifestContent')}
>
	<div
		class={classNames('ManifestContentPrimary')}
	>
		<ManifestTable
			keys={MANIFEST_PRIMARY_KEYS}
			manifest={manifest}
		/>
	</div>
	<div
		class={classNames('ManifestContentSecondary')}
	>
		<!-- <ManifestTable
			keys={MANIFEST_SECONDARY_KEYS}
			manifest={manifest}
		/> -->
		<div
			class={classNames('ManifestContentThumbnail')}
		>
			<img
				alt=''
				src={manifest?.thumbnail?.value}
				class={classNames('ManifestContentThumbnailImage')}
			/>
		</div>
	</div>
</div>