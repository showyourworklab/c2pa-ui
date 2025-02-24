<script>
	import '$common/css/globals.scss'
	import SywLogo from '$common/images/logo-dark.svg'
	import { base } from '$app/paths'
</script>

<main class="Syw-App">
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

	<h1>syw</h1>

	<section>
		<h2>syw/svelte</h2>
		<code>
{`
<script>
	import { SywSvelte } from "syw/svelte";
</script>

<SywSvelte
	locale=""
	src=""
	caption=""
	byline=""
/>`}
		</code>
		<p>View the code and documenation on <a href="https://github.com/showyourworklab/syw/tree/development/packages/svelte">GitHub</a></p>
		<p>Check out the <a href="{base}/svelte">demo</a></p>
	</section>
	
	<section>
		<h2>syw/react</h2>
		<code>
{`
import { SywReact } from "syw/react";

return (
	<SywReact
		locale=""
		src=""
		caption=""
		byline=""
	/>
)`}
		</code>
		<p>View the code and documenation on <a href="https://github.com/showyourworklab/syw/tree/development/packages/react">GitHub</a></p>
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