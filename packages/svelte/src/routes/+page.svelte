<script>
	import '$common/css/globals.scss'
	import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
	import { DEMO_IMAGES, DEMO_IMAGE_DEFAULT } from '$common/images/demo'
	import SywLogo from '$common/images/logo-dark.svg'
	import App from '$lib/components/App.svelte'

	const locales = Object.keys(DICTIONARIES)
	let locale = LOCALE_DEFAULT

	const demoImages = Object.keys(DEMO_IMAGES)
	let demoImageIndex = DEMO_IMAGE_DEFAULT;
	let demoImage = DEMO_IMAGES[demoImageIndex];

	const onLocaleChange = e => {
		const { value } = e.target
		locale = value
	}

	const onImageChange = e => {
		const { value } = e.target
		demoImageIndex = value
		demoImage = DEMO_IMAGES[value]
	}
</script>

<main>
	<a
		href="https://showyourworklab.org"
		target="_blank"
	>
		<img
			src={SywLogo}
			alt="Show Your Work Lab logo"
			id="logo"
		/>
	</a>
	<h1>
		<a href="../">c2pa-ui</a>/svelte
	</h1>
	<p>
		A Svelte component that wraps a C2PA-compliant image in a UI to expose its provenance.
	</p>

	<select
		id="locale"
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
		<header>
			<h2>Select image to demo:</h2>
			<select
				id="image"
				value={demoImageIndex}
				on:change={onImageChange}
			>
				{#each demoImages as value}
					<option
						value={value}
					>
						{value}
					</option>
				{/each}
			</select>
		</header>
		<App
			locale={locale}
			src={demoImage}
			caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
			byline='Lectus Vitae / Tristique Imperdiet'
		/>
	</section>
</main>

<style>
	main {
		max-width: 700px;
		margin: auto;
		padding: 0 2em;
		font-family: monospace;
	}
	#logo {
		width: 10rem;
		margin: 1rem 0 0 0;
	}
	h1 a {
		color: currentColor;
	}
	section {
		margin: 4rem auto;
	}
	section header {
		display: flex;
		margin: 0 0 1rem 0;
	}
	section header h2 {
		margin: 0 1rem 0 0;
	}
	select#locale {
		position: fixed;
		top: 1rem;
		right: 1rem;
	}
</style>