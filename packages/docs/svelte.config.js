import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		alias: {
			$src: './src',
			$lib: './src/lib',
		},
		adapter: adapter({
			pages: '../../public',
			// assets: '../../public',
			// assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
			fallback: 'index.html'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/syw' : '',
		}
	}
};

export default config;
