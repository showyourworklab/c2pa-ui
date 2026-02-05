<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
	import { getVerifyUrl } from 'syw-common/helpers'

	import Collapse from './Collapse.svelte'
	import Manifest from './Manifest.svelte'

	const { src, manifests } = getContext('dataStoreContext');
	const { locale, getText } = getContext('i18nStoreContext');
	const { isProvenanceOpen } = getContext('uiStoreContext');

	const verifyUrl = $derived(getVerifyUrl($src))

</script>

<div
	class={classNames('Provenance')}
>
	<Collapse
		open={$isProvenanceOpen}
	>
		<div
			class={classNames('ProvenanceInner')}
		>
			<ul
				class={classNames('ProvenanceList')}
			>
				{#each $manifests as manifest}
					<Manifest
						manifest={manifest}
					/>
				{/each}
			</ul>
			<div class={classNames('ProvenanceVerify')}>
				{getText($locale, 'verify', 'pre')}
				<a
					href={verifyUrl}
					target='_blank'
				>
					{getText($locale, 'verify', 'cc')}
				</a>
			</div>
		</div>
	</Collapse>
</div>