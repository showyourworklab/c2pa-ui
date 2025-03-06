<script>
	import { onMount } from 'svelte'
	import styles from '../../../../common/css/Provenance.module.scss'
	import { manifests } from '../store/data'
	import { isProvenanceOpen } from '../store/ui'
	import { locale, getText } from '../store/i18n'
	import { src } from '../store/data'
	import { getVerifyUrl } from '../../../../common/helpers'
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
				{getText($locale, 'verify')}
				<a
					href={verifyUrl}
					target='_blank'

				>
					Content Credentials
				</a>
			</div>
		</div>
	</Collapse>
</div>