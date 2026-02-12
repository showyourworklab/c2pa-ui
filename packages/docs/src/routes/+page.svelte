<script>
	import { base } from '$app/paths'
	import 'syw-common/css/globals.css'
	import SywSvelte from 'syw-svelte'
	import Header from '$lib/components/Header.svelte'
	import Heading from '$lib/components/Heading.svelte'
	import Preview from '$lib/components/Preview.svelte'
	import SsrFallback from '$lib/components/SsrFallback.svelte'
	import '$src/styles.css'
</script>

<main>
	<Header />
	
	<Heading />
	
	<SsrFallback>
		<Preview
			SywSvelte={SywSvelte}
		/>
	</SsrFallback>

	<section>
		<h2>
			syw-svelte
		</h2>
		<code>
{`<script>
	import SywSvelte from "syw-react";
</script>

<SywSvelte
	locale="en-US"
	src="https://example.com/image.jpg"
	caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
	byline="Nulla Dignissim"
	onEvent={handleEvent}
/>`}
		</code>
		<p>
			<a
				href="{base}/svelte"
				class="button"
			>
				Check out the demo
			</a>
			
			<a
				href="https://github.com/showyourworklab/syw/tree/development/packages/svelte"
				target="_blank"
				rel="noopener noreferrer"
				class="button"
				data-icon="github"
			>
				View code
			</a>
		</p>
	</section>
	
	<section>
		<h2>
			syw-react
		</h2>
		<code>
{`import SywReact from "syw-react";

return (
	<SywReact
		locale="en-US"
		src="https://example.com/image.jpg"
		caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
		byline="Nulla Dignissim"
		onEvent={handleEvent}
	/>
);`}
		</code>
		<p>
			<a
				href="{base}/react"
				class="button"
			>
				Check out the demo
			</a>
			<a
				href="https://github.com/showyourworklab/syw/tree/development/packages/react"
				target="_blank"
				rel="noopener noreferrer"
				class="button"
				data-icon="github"
			>
				View code
			</a>
		</p>
	</section>
</main>

<style>
	
</style>