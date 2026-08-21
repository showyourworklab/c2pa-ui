import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
			// Match react/react-dom AND their subpaths (react/jsx-runtime,
			// react-dom/client, etc). A plain ['react', 'react-dom'] array only
			// matches those exact specifiers — "jsx": "react-jsx" makes every
			// .tsx file import from 'react/jsx-runtime', a different specifier,
			// which was silently NOT excluded and got bundled wholesale,
			// hardcoding React 18's internals property name into our output and
			// breaking under React 19 (which renamed it).
			external: (id) => /^react(-dom)?(\/.*)?$/.test(id),
			output: {
				globals: (id) =>
					id === 'react' ? 'React'
					: id === 'react-dom' ? 'ReactDOM'
					: id,
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
	],
	server: {
		port: 3000,
		// fs: {
		// 	allow: ['../..'] // or the specific path to your packages dir
		// }
	}
})