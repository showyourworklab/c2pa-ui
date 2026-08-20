import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
	publicDir: 'public',
	resolve: {
		alias: {
			'$src': resolve(__dirname, 'src'),
			'syw-common': resolve(__dirname, '../common')
		},
	},
	build: {
		outDir: 'dist',
		copyPublicDir: false,
		lib: {
			name: 'SywReact',
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'umd'],
			fileName: (format) =>
				`index.${format}.js`
				// format === 'es'
				// 	? `index.js`
				// 	: `index.${format}.js`
			,
			cssFileName: "style"
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					'react': 'React',
					'react-dom': 'ReactDOM',
				},
				assetFileNames: 'styles.[ext]',
			},
		},
		cssCodeSplit: false
	},
	esbuild: {
		loader: 'tsx',
		include: /(src\/.*\.jsx?$)|(\.tsx?$)/,
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
			generateScopedName: 'Syw-[local]',
		},
	},
	plugins: [
		react({
			// Disabling this since to stop re-registration custom element error when
			// hot-reloading web components
			// fastRefresh: false,
		}),
		dts({
			entryRoot: 'src',
			include: ['src'],
			insertTypesEntry: true,
		}),
	],
	server: {
		port: 3000,
		// fs: {
		// 	allow: ['../..'] // or the specific path to your packages dir
		// }
	}
})