<script>
    import SsrFallback from '$src/lib/components/SsrFallback.svelte';
	import 'syw-common/css/globals.css'
	import SywSvelte from 'syw-svelte'
</script>

<main id="main">
	<article id="article">
		<hgroup id="heading">
			<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
			<p>Duis pretium quam vel sem rhoncus, id feugiat ex eleifend. Nam suscipit, elit eu cursus lacinia, enim metus viverra massa, non egestas urna elit vel augue.</p>
		</hgroup>
		<p>
			Praesent porta justo hendrerit sollicitudin vestibulum. Pellentesque suscipit faucibus tellus, sit amet dictum diam malesuada sed. Donec at ultrices augue. Morbi ultricies vitae dui ac tempor. Integer quis urna id ante dictum condimentum non tempor tellus. Vestibulum tristique facilisis ante, commodo vehicula enim pretium vel. Phasellus sed magna eget arcu porttitor scelerisque. Aliquam ac dolor magna.
		</p>
		<SsrFallback>
			<SywSvelte
				locale={"no_NO"}
				src={`https://raw.githubusercontent.com/showyourworklab/c2pa-images/refs/heads/main/images/sony-nora-2.jpg`}
				caption='Revelers fill Washington Square Park in New York City on Sunday, June 28, 2026, as crowds gathered following the Queer Liberation March, held alongside the official NYC Pride March.'
				byline='Nora Savosnick'
			/>
		</SsrFallback>
		<p>
			Donec et volutpat erat, vel porttitor dui. Nulla viverra mi laoreet ex tincidunt, sit amet maximus libero congue. Vestibulum id elit leo. Integer quis sapien gravida, auctor massa nec, hendrerit est. Duis finibus mauris in justo suscipit venenatis. Aliquam rhoncus mollis ligula, quis dapibus lectus tincidunt eu. Vestibulum dapibus, tellus ut rutrum suscipit, magna velit molestie nibh, eu mollis massa leo id sapien. Nullam ullamcorper enim elit, et luctus enim ullamcorper a. Nulla molestie varius orci, eu fringilla nibh tincidunt ut. Duis vehicula, risus id dictum tempor, mi nisl sodales odio, eget gravida dolor mi eu eros. Quisque in eros sagittis, finibus erat posuere, euismod elit. Quisque eu eleifend libero. Quisque volutpat efficitur ullamcorper. Donec ut auctor metus.
		</p>
	</article>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');
	:global(html) {
		font-family: "EB Garamond", "Work Sans", Helvetica, Arial, sans-serif;
		background-color: #FFFFFD;
	}
	:global(body) {
		margin: auto;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	:global(#root) {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	:global(.Syw-App) {
		
	}
	main#main {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
	article#article {
		margin: auto;
		padding: 3rem;
		max-width: 900px;
	}
	article#article > p {
		max-width: 600px;
		margin: 1rem auto;
		font-size: 20px;
		line-height: 28px;
	}
	hgroup#heading {
		max-width: 600px;
		margin: 0 auto 3rem auto;
	}
	hgroup#heading h1 {
		font-size: 40px;
		line-height: 45px;
	}
	hgroup#heading p {
		font-size: 23px;
		line-height: 28px;
	}
</style>