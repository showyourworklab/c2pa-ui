<script>
	import { getContext } from 'svelte'
	import styles from 'syw-common/css/Provenance.module.css'
	import { getVerifyUrl } from 'syw-common/helpers'
	import Collapse from './Collapse.svelte'
	import Manifest from './Manifest.svelte'

	const { src, manifests } = getContext('dataStoreContext');
	const { locale, getText } = getContext('i18nStoreContext');
	const { isProvenanceOpen } = getContext('uiStoreContext');

	const verifyUrl = $derived(getVerifyUrl($src))

</script>

<div
	class={styles.Provenance}
>
	<Collapse
		open={$isProvenanceOpen}
	>
		<div
			class={styles.ProvenanceInner}
		>
			<ul
				class={styles.ProvenanceList}
			>
				{#each $manifests as manifest}
					<Manifest
						manifest={manifest}
					/>
				{/each}
			</ul>
			<div class={styles.ProvenanceVerify}>
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