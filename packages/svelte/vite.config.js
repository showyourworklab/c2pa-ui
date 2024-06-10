import { resolve } from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'c2paUi-[local]',
		},
	},
	server: {
		port: 3000
	}
});
