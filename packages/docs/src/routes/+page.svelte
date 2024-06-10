<script>
	import '$common/css/globals.scss'
	import { base } from '$app/paths'
</script>

<main class="c2paUi-App">
	<h1>c2pa-ui/docs</h1>

	<section>
		<h2>c2pa-ui/svelte</h2>
		<code>
{`<script>
	import { C2paUiSvelte } from "c2pa-ui/svelte";
</script>

<C2paUiSvelte
	locale=""
	src=""
	caption=""
	byline=""
/>`}
		</code>
		<p>View the code and documenation on <a href="https://github.com/coreytegeler/c2pa-ui/tree/development/packages/svelte">GitHub</a></p>
		<p>Check out the <a href="{base}/../svelte">demo</a></p>
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
		<p>View the code and documenation on <a href="https://github.com/coreytegeler/c2pa-ui/tree/development/packages/react">GitHub</a></p>
		<p>Check out the <a href="{base}/../react">demo</a></p>
	</section>
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
	code {
		white-space: pre;
		padding: 1rem;
		display: block;
		font-size: var(--text-1);
		color: var(--color-secondary-dark);
		background-color: var(--color-secondary-light);
	}
	/*select {
		position: fixed;
		top: 1rem;
		right: 1rem;
	}*/
</style>