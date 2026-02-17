<script>
	import 'syw-common/css/globals.css'
	import 'syw-docs/src/styles.css'
	import { DEMO_IMAGE_URLS, DEMO_IMAGE_URL_DEFAULT } from 'syw-common/constants/demo'
	import { LOCALE_DEFAULT, DICTIONARIES } from 'syw-common/constants/i18n'
	import { VARIANT_DEFAULT, VARIANT_KEYS } from 'syw-common/constants'
	const locales = Object.keys(DICTIONARIES)

	const { SywSvelte } = $props();
	let variant = $state(VARIANT_DEFAULT)
	let locale = $state(LOCALE_DEFAULT)
	let demoImage = $state(DEMO_IMAGE_URL_DEFAULT);

	const onLocaleChange = e => {
		const { value } = e.target
		locale = value
	}

	const onVariantChange = e => {
		const { value } = e.target
		variant = value
	}

	const onImageChange = e => {
		const { value } = e.target
		demoImage = value
	}

	const handleEvent = (type, event, manifest) => {
		// console.log(type, event, manifest)
	}

</script>
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
				onchange={onImageChange}
			>
				{#each DEMO_IMAGE_URLS as value}
					<option
						value={value}
					>
						{value.substring(value.lastIndexOf('/') + 1)}
					</option>
				{/each}
			</select>
		</div>
		<div>
			<label
				for="select-variant"
			>
				Select embed variant:
			</label>
			<select
				id="select-variant"
				value={variant}
				onchange={onVariantChange}
			>
				{#each VARIANT_KEYS as value}
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
				onchange={onLocaleChange}
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
		variant={variant}
		locale={locale}
		src={demoImage}
		caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
		byline='Lectus Vitae / Tristique Imperdiet'
		onEvent={handleEvent}
	/>
</section>

<style>
	
</style>