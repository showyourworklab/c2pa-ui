import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

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
