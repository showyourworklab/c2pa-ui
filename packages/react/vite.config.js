import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	publicDir: 'public',
	resolve: {
		alias: {
			'$src': resolve(__dirname, 'src'),
			'$common': resolve(__dirname, '../common'),
		},
	},
	build: {
		outDir: 'dist',
		copyPublicDir: false,
		lib: {
			name: 'C2paUiReact',
			entry: resolve(__dirname, 'src/index.jsx'),
			formats: ['es'],
			fileName: (format) => {
				return format === 'es'
					? `index.js`
					: `index.${format}.js`
			},
		},
		rollupOptions: {
			external: ['react'],
		}
	},
	esbuild: {
		loader: 'jsx',
		include: /src\/.*\.jsx?$/,
		exclude: [],
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
		exclude: ['c2pa', '@contentauth/react-hooks'],
	},
	css: {
		modules: {
			localsConvention: 'dashes', // dashes camelCase
			generateScopedName: 'c2paUi-[local]',
		},
	},
	plugins: [
		react({
			// Disabling this since to stop re-registration custom element error when
			// hot-reloading web components
			// fastRefresh: false,
		}),
	],
	server: {
		port: 3000,
	}
})