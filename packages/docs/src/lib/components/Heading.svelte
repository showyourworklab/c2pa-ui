<script>
	import { base } from '$app/paths'
	const { type } = $props();
</script>

<hgroup>
	<h1>
		The Show Your Work UI
	</h1>
	{#if type}
		<h2><var>syw-{type}</var></h2>
	{/if}
	<p><strong><a href="{base}/react">React</a></strong> and <strong><a href="{base}/svelte">Svelte</a></strong> component to embed images with their C2PA data in a user-friendly interface</p>
	<p>
		<a
			href="https://github.com/showyourworklab/syw/"
			target="_blank"
			rel="noopener noreferrer"
			class="button"
			data-icon="github"
		>
			View code
		</a>
	</p>
</hgroup>

<style>
	
</style>