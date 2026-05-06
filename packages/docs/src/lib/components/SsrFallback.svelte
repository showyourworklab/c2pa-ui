<script lang="ts">
	import { onMount } from 'svelte'

	let { children } = $props();
	
	let mounted = $state(false);
	onMount(() => {
    	mounted = true;
	});
</script>

{#if mounted}
	{@render children?.()}
{:else}
	<!-- SSR fallback -->
{/if}