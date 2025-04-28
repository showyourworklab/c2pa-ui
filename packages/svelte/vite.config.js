import { resolve } from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	// build: {
	// 	lib: {
	// 		entry: resolve(__dirname, 'src/lib/components/App.svelte'),
	// 		name: 'SywSvelte',
	// 		formats: ['es', 'umd'],
	// 		fileName: (format) => `index.${format}.js`,
	// 	},
	// 	rollupOptions: {
	// 		external: ['svelte'],
	// 		output: {
	// 			globals: {
	// 				svelte: 'svelte',
	// 			},
	// 		},
	// 	},
	// },
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
