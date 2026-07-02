<script>
    import SsrFallback from '$src/lib/components/SsrFallback.svelte';
	import SywSvelte from 'syw-svelte'
	import 'syw-common/css/globals.css'

	let { params, data } = $props();
	let { locale } = $derived(params);
	let { dictionary } = $derived(data);

</script>

<header id="header">
	<div id="locales">
		<a href="./en_US">English</a>
		<a href="./no_NO">Norsk</a>
	</div>
	<a href={dictionary?.feedback_url} target="_blank">
		{dictionary?.feedback_prompt}
	</a>
</header>
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
				locale={locale}
				src={`https://raw.githubusercontent.com/showyourworklab/c2pa-images/refs/heads/main/images/sony-nora-2.jpg`}
				caption={dictionary?.caption}
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
	* {
		box-sizing: border-box;
	}
	:global(html) {
		font-family: "EB Garamond", times, serif;
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
	header#header {
		width: 100%;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 2;
		padding: 5px;
		background-color: white;
		display: flex;
		justify-content: space-between;
		font-family: "Work Sans", Helvetica, Arial, sans-serif;
		font-size: 12px;
	}
	header#header a {
		color: black;
		text-transform: uppercase;
	}
	#locales {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 8px;
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