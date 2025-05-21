import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	publicDir: 'static',
	base: process.env.NODE_ENV === 'production'
		? '/syw/'
		: '',
	resolve: {
		alias: {
			'$src': resolve(__dirname, 'src'),
			'$common': resolve(__dirname, '../common'),
		},
	},
	build: {
		outDir: resolve(__dirname, '../../public'),
		assetsDir: './article/assets',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'article/index.html')
			},
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
			localsConvention: 'dashes',
			generateScopedName: 'Syw-[local]',
		},
	},
	plugins: [
		react(),
	],
	server: {
		port: 3000,
	}
})