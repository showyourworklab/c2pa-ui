import adapter from '@sveltejs/adapter-static';
import { sveltePreprocess } from 'svelte-preprocess'

const config = {
	preprocess: sveltePreprocess(),
	kit: {
		alias: {
			$src: 'src',
			$lib: 'src/lib',
			'syw-common': 'src/lib/common',
			// 'syw-common': '../common',
		},
		adapter: adapter({
			pages: '../../public/svelte',
			// assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true,
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/syw/svelte' : '',
		},
	}
};

export default config;
