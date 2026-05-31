<script>
	import { getContext } from 'svelte'
	import { classNames } from 'syw-common/helpers'
	import { getVerifyUrl } from 'syw-common/helpers/c2pa'
	import { VERIFY_BASE_URL } from 'syw-common/constants'

	import Manifest from './Manifest.svelte'

	const { src, manifests } = getContext('dataStoreContext');
	const { locale, getText } = getContext('i18nStoreContext');

	const verifyUrl = $derived(getVerifyUrl($src))

</script>

<div
	class={classNames('Provenance')}
>
	<ul
		class={classNames('ProvenanceList')}
	>
		{#each [...$manifests].reverse() as manifest}
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
			{VERIFY_BASE_URL}
		</a>
	</div>
</div>