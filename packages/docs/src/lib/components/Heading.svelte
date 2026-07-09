<script>
	const { type } = $props()

	const reactUrl = import.meta.env.PROD ? '/syw/react' : '/react'
	const svelteUrl = import.meta.env.PROD ? '/syw/svelte' : '/svelte'
</script>

<hgroup>
	<h1>
		The Show Your Work UI
	</h1>
	{#if type}
		<h2><var>syw-{type}</var></h2>
	{/if}
	<p><strong><a href="{reactUrl}">React</a></strong> and <strong><a href="{svelteUrl}">Svelte</a></strong> component to embed images with their C2PA data in a user-friendly interface</p>
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