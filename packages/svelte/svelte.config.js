import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

const config = {
	preprocess: preprocess(),
	kit: {
		alias: {
			$src: './src',
			$lib: './src/lib',
			$common: '../common',
		},
		adapter: adapter({
			pages: '../../public/svelte',
			// assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true,
			fallback: 'index.html'
		}),
		paths: {
			base: process.env.NODE_ENV === 'production'
				? process.env.NETLIFY
					? '/svelte' // If build for Netlify
					: '/c2pa-ui/svelte' // If build for GitHub
				: '', // If local development
		}
	}
};

export default config;
