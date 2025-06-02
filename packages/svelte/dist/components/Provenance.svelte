<script>
	import { onMount } from 'svelte'
	import styles from '@syw/common/css/Provenance.module.scss'
	import { getVerifyUrl } from '@syw/common/helpers'
	import { manifests } from '../store/data'
	import { isProvenanceOpen } from '../store/ui'
	import { locale, getText } from '../store/i18n'
	import { src } from '../store/data'
	import Collapse from './Collapse.svelte'
	import Manifest from './Manifest.svelte'

	let verifyUrl
	onMount(() => {
		verifyUrl = getVerifyUrl($src)
	})

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