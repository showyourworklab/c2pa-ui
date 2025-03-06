<script>
	import '$common/css/globals.scss'
	import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
	import { DEMO_IMAGE_URLS, DEMO_IMAGE_URL_DEFAULT, DEMO_IMAGE_URL_BASE } from '$common/constants'
	import SywLogo from '$common/images/logo-dark.svg'
	import SywSvelte from '$lib'

	const locales = Object.keys(DICTIONARIES)
	let locale = LOCALE_DEFAULT

	let demoImage = DEMO_IMAGE_URL_DEFAULT;

	const onLocaleChange = e => {
		const { value } = e.target
		locale = value
	}

	const onImageChange = e => {
		const { value } = e.target
		demoImage = value
	}

	const handleEvent = (type, event, manifest) => {
		// console.log(type, event, manifest)
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
		<a href="../">syw</a>/svelte
	</h1>
	<p>
		A Svelte component that wraps a C2PA-compliant image in a UI to expose its provenance.
	</p>

	<section>
		<header>
			<div>
				<label
					for="select-image"
				>
					Select image to demo:
				</label>
				<select
					id="select-image"
					value={demoImage}
					on:change={onImageChange}
				>
					{#each DEMO_IMAGE_URLS as value}
						<option
							value={value}
						>
							{value}
						</option>
					{/each}
				</select>
			</div>
			<div>
				<label
					for="select-locale"
				>
					Select language of component:
				</label>					
				<select
					id="select-locale"
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
			</div>
		</header>
		<SywSvelte
			locale={locale}
			src={`${DEMO_IMAGE_URL_BASE}/${demoImage}`}
			caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
			byline='Lectus Vitae / Tristique Imperdiet'
			onEvent={handleEvent}
		/>
	</section>
</main>

<style>
	main {
		font-family: monospace;
		max-width: 700px;
		margin: 0 auto;
		padding: 0 2rem;
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
		justify-content: space-between;
		margin: 0 0 1rem 0;
	}
	section header label {
		font-weight: bold;
		margin-right: 0.25rem;
	}
	section header select {
		
	}
</style>