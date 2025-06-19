import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
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
