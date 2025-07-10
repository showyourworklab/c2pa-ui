import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	build: {
		lib: {
			name: 'SywSvelte',
			entry: resolve(__dirname, 'src/lib/index.js'),
			fileName: (format) => `index.${format}.js`,
			formats: ['es', 'umd'],
		},
		rollupOptions: {
			external: ['svelte', 'c2pa']
		},
	},
	resolve: {
		alias: {
			$src: resolve(__dirname, '/src'),
			$lib: resolve(__dirname, '/src/lib'),
			'syw-common': resolve(__dirname, 'src/lib/common'),
		},
	},
	plugins: [
		svelte(),
		devtoolsJson()
	],
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	}
});
