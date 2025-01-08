import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	publicDir: 'static',
	base: process.env.NODE_ENV === 'production'
		? process.env.NETLIFY
			? '/react/' // If build for Netlify
			: '/c2pa-ui/react/' // If build for GH Pages
		: '', // If local development
	resolve: {
		alias: {
			'$src': resolve(__dirname, 'src'),
			'$common': resolve(__dirname, '../common'),
		},
	},
	build: {
		outDir: resolve(__dirname, '../../public/react'),
		// rollupOptions: {
		// 	external: ['react'],
		// }
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