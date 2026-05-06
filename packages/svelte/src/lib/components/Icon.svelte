<script>
	import Camera from '@lucide/svelte/icons/camera'
	import Check from '@lucide/svelte/icons/check'
	import Ellipsis from '@lucide/svelte/icons/ellipsis'
	import Scissors from '@lucide/svelte/icons/scissors'
	import Sparkles from '@lucide/svelte/icons/sparkles'
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert'
	import X from '@lucide/svelte/icons/x'
	import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
	import { classNames } from 'syw-common/helpers'

	const {
		type,
		size = ICON_DEFAULT_SIZE,
		strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
		className
	} = $props()

	export const ICONS = {
		close: X,
		validating: Ellipsis,
		trusted: Check,
		valid: Check,
		invalid: X,
		unknown: TriangleAlert,
		camera: Camera,
		edit: Scissors,
		ai: Sparkles,
	}

	const IconComponent = $derived(ICONS[type])
	// console.log()
</script>

{#if IconComponent}
	<IconComponent
		size={size}
		strokeWidth={strokeWidth}
		class={classNames(
			'Icon',
			`Icon_${type}`,
			className
		)}
	/>
{:else}
	test
{/if}