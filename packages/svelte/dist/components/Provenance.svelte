<script>
	import styles from '../../../../common/css/Provenance.module.scss'
	import { manifests } from '../store/data.js'
	import { isShowProvenance } from '../store/ui.js'
	import Collapse from './Collapse.svelte'
	import Manifest from './Manifest.svelte'
</script>

<div
	class={styles.Provenance}
>
	<Collapse
		open={$isShowProvenance}
	>
		<div
			class={styles.ProvenanceInner}
		>
			<ul
				class={styles.ProvenanceList}
			>
				{#each $manifests as manifest, index}
					<Manifest
						index={index}
						manifest={manifest}
					/>
				{/each}
			</ul>
			<div class={styles.ProvenanceVerify}>
				Verify with&nbsp;
				<a
					href={'#'}
					target='_blank'

				>
					Content Credentials
				</a>
			</div>
		</div>
	</Collapse>
</div>