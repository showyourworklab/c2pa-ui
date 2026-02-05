<script>
	// import styles from 'syw-common/css/Collapse.module.css'
	import { joinClassNames } from 'syw-common/helpers'

	const { open, children } = $props();

    let height = $state(null);
	
	const style = $derived(`height:${open ? height : 0}px`)
	const classes = $derived(
		joinClassNames(
			'Collapse',
			open ? 'Collapse_open' : false
		)
	)

</script>

<div
	class={classes}
	style={style}
	aria-expanded={open}
>
	<div bind:clientHeight={height}>
		<div
			class='CollapseInner'
		>
			{@render children()}
		</div>
	</div>
</div>