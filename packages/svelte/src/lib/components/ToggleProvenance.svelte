<script>
	import styles from '$common/css/ToggleProvenance.module.scss'
	import { locale, getText } from '$lib/store/i18n.js'
	import { isShowProvenance, toggleProvenance } from '$lib/store/ui.js'
	import { origin } from '$lib/store/data.js'

	const handleClick = () => {
		toggleProvenance()
	}

	console.log($locale, $origin)

</script>

<button
	aria-pressed={true}
	class={styles.ToggleProvenance}
	on:click={handleClick}
>
	{$isShowProvenance
		? getText($locale, 'origin', $origin)
		: getText($locale, 'origin', $origin)
	}
</button>