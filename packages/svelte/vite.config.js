import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
	build: {
		outDir: 'dist',
        // emptyOutDir: true,
		lib: {
			name: 'SywSvelte',
			entry: resolve(__dirname, 'src/lib/index.js'),
			// fileName: (format) => `index.${format}.js`,
			fileName: () => `index.js`,
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'svelte',
				'@contentauth/c2pa-web'
			],
			output: {
                assetFileNames: 'styles.[ext]',
            },
		},
		cssCodeSplit: false
	},
	resolve: {
		alias: {
			$src: resolve(__dirname, '/src'),
			$lib: resolve(__dirname, '/src/lib'),
			'syw-common': resolve(__dirname, '../common'),
		},
	},
	plugins: [
		svelte({
			compilerOptions: {
				runes: true,
			},
			emitCss: true,
		}),
		devtoolsJson()
	],
	ssr: {
		noExternal: ['@ark-ui/svelte']
	},
	css: {
		modules: {
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	}
});
