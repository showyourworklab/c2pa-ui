<script>
	import styles from '../../../../common/css/Cutline.module.scss'
	import ToggleProvenance from './ToggleProvenance.svelte'
	import ToggleExplainer from './ToggleExplainer.svelte'
</script>

<div
	class={styles.Cutline}
>
	<div
		class={styles.CutlineToggles}
	>
		<ToggleProvenance />
		<ToggleExplainer />
	</div>
</div>