import { resolve } from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	resolve: {
		alias: {
			$src: './src',
			$lib: './src/lib',
			'syw-docs': resolve(__dirname, '../docs'),
			'syw-common': resolve(__dirname, '../common'),
		},
	},
	plugins: [
		sveltekit(),
		devtoolsJson()
	],
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	},
	server: {
		port: 3000
	}
});
