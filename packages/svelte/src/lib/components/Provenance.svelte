<script lang="ts">
	import { classNames } from 'syw-common/helpers'
	import { getVerifyUrl } from 'syw-common/helpers/c2pa'
	import { VERIFY_BASE_URL } from 'syw-common/constants'
	import { getDataContext } from '$lib/store/data.js'
	import { getI18nContext } from '$lib/store/i18n.js'
	import { getUiContext } from '$lib/store/ui.js'

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
		<div
			class={classNames('ProvenanceList')}
		>
			{#each $manifests as manifest, index}
				<Manifest
					manifest={manifest}
					previewRef={index === 0 ? (el) => firstPreviewEl = el : null}
				/>
			{/each}
		</div>
	{:else}
		<div
			class={classNames('ProvenanceNone')}
		>
			{getText($locale, 'provenance', 'toggle')}
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
