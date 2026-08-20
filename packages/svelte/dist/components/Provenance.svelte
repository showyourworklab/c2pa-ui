<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { getVerifyUrl } from 'syw-common/helpers/c2pa'
	import { VERIFY_BASE_URL } from 'syw-common/constants'
	import { getDataContext } from '../store/data.js'
	import { getI18nContext } from '../store/i18n.js'
	import { getUiContext } from '../store/ui.js'

	import Manifest from './Manifest.svelte'

	const { src, manifests } = getDataContext();
	const { locale, getText } = getI18nContext();
	const { isProvenanceOpen } = getUiContext();

	const verifyUrl = $derived(getVerifyUrl($src ?? ''))

	let firstPreviewEl: HTMLElement | null = $state(null)

	$effect(() => {
		if($isProvenanceOpen && firstPreviewEl) firstPreviewEl.focus()
	})

</script>

<div
	class={classNames('Provenance')}
>
	{#if $manifests && $manifests.length}
		<ul
			class={classNames('ProvenanceList')}
		>
			{#each $manifests as manifest, index}
				<Manifest
					manifest={manifest}
					previewRef={index === 0 ? (el) => firstPreviewEl = el : null}
				/>
			{/each}
		</ul>
	{:else}
		<div
			class={classNames('ProvenanceNone')}
		>
			No provenance found
		</div>
	{/if}
	<div class={classNames('ProvenanceVerify')}>
		{getText($locale, 'verify', 'pre')}
		<a
			href={verifyUrl}
			target='_blank'
		>
			{VERIFY_BASE_URL}
		</a>
	</div>
</div>
