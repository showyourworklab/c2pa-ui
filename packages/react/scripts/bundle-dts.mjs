import { readdir, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = resolve(__dirname, '../dist')

const bundle = await rollup({
	input: resolve(outDir, 'index.d.ts'),
	plugins: [
		nodeResolve({ extensions: ['.d.ts', '.ts'] }),
		dts(),
	],
})
await bundle.write({ file: resolve(outDir, 'index.d.ts'), format: 'es' })
await bundle.close()

const KEEP = new Set(['index.d.ts', 'index.es.js', 'index.umd.js', 'styles.css'])
for (const name of await readdir(outDir)) {
	if (KEEP.has(name)) continue
	await rm(resolve(outDir, name), { recursive: true, force: true })
}
