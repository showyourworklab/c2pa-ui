<script>
	import styles from '@syw/common/css/Collapse.module.scss'
	import { joinClassNames } from '@syw/common/helpers'

	export let open

    let height;
	$: style = `height:${open ? height : 0}px`
	$: classes = joinClassNames(
		styles.Collapse,
		open ? styles.Collapse_open : false
	)

</script>

<div
	class={classes}
	style={style}
	aria-expanded={open}
>
	<div bind:clientHeight={height}>
		<div
			class={styles.CollapseInner}
		>
			<slot />
		</div>
	</div>
</div>