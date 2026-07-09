import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { sveltePreprocess } from 'svelte-preprocess'

const config = {
	preprocess: vitePreprocess({
		style: {
			css: {
				modules: {
					localsConvention: 'dashes',
					generateScopedName: 'Syw-[local]',
				},
			},
		},
	}),
	compilerOptions: {
		runes: true,
	},
	onwarn: (warning, handler) => {
		if (warning.code === 'css_unused_selector') return
		handler(warning)
	},
	kit: {
		alias: {
			// $src: 'src',
			// $lib: 'src/lib',
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
	},
};

export default config;
