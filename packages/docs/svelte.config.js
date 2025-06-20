import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(),
	kit: {
		alias: {
			$src: './src',
			$lib: './src/lib',
			$static: './static',
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
		prerender: {
			handleHttpError: 'ignore'
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/syw' : '',
		}
	}
};

export default config;
