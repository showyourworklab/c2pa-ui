<script>
	import '$common/css/globals.scss'
	import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
	import ImageLeica1 from '$common/images/leica-1.jpg'
	import ImageInvalid from '$common/images/invalid.jpg'
	import App from '$lib/components/App.svelte'

	const locales = Object.keys(DICTIONARIES)
	let locale = LOCALE_DEFAULT

	const onLocaleChange = e => {
		const { value } = e.target
		locale = value
	}

</script>


<main>
	<h1>c2pa-ui/svelte</h1>
	<p>
		A Svelte component that wraps a C2PA-compliant image in a UI to expose its provenance.
	</p>

	<select
		value={locale}
		on:change={onLocaleChange}
	>
		{#each locales as value}
			<option
				value={value}
			>
				{value}
			</option>
		{/each}
	</select>

	<section>
		<h2>Image with C2PA data from Leica camera</h2>
		<App
			locale={locale}
			src={ImageInvalid}
			caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
			byline='Lectus Vitae / Tristique Imperdiet'
			origin='camera'
		/>
	</section>
	<footer>
		This page is built with Svelte
	</footer>
</main>

<style>
	main {
		max-width: 700px;
		margin: auto;
		padding: 0 4rem;
		font-family: monospace;
	}
	section {
		margin: 4rem auto;
	}
	select {
		position: fixed;
		top: 1rem;
		right: 1rem;
	}
</style>