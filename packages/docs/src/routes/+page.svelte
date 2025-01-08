<script>
	import '$common/css/globals.scss'
	import SywLogo from '$common/images/logo-dark.svg'
	import { base } from '$app/paths'
</script>

<main class="c2paUi-App">
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

	<h1>c2pa-ui</h1>

	<section>
		<h2>c2pa-ui/svelte</h2>
		<code>
{`
<script>
	import { C2paUiSvelte } from "c2pa-ui/svelte";
</script>

<C2paUiSvelte
	locale=""
	src=""
	caption=""
	byline=""
/>`}
		</code>
		<p>View the code and documenation on <a href="https://github.com/showyourworklab/c2pa-ui/tree/development/packages/svelte">GitHub</a></p>
		<p>Check out the <a href="{base}/svelte">demo</a></p>
	</section>
	
	<section>
		<h2>c2pa-ui/react</h2>
		<code>
{`
import { C2paUiReact } from "c2pa-ui/react";

return (
	<C2paUiReact
		locale=""
		src=""
		caption=""
		byline=""
	/>
)`}
		</code>
		<p>View the code and documenation on <a href="https://github.com/showyourworklab/c2pa-ui/tree/development/packages/react">GitHub</a></p>
		<p>Check out the <a href="{base}/react">demo</a></p>
	</section>
</main>

<style>
	main {
		max-width: 700px;
		margin: auto;
		padding: 0 2rem;
		font-family: monospace;
	}
	#logo {
		width: 10rem;
		margin: 1rem 0 0 0;
	}
	section {
		margin: 4rem auto;
	}
	code {
		white-space: pre;
		padding: 1rem;
		display: block;
		font-size: var(--text-1);
		color: var(--color-secondary-dark);
		background-color: var(--color-secondary-light);
	}
</style>