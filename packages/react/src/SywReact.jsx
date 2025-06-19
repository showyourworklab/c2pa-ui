import wasmSrc from 'c2pa/dist/assets/wasm/toolkit_bg.wasm?url'
import workerSrc from 'c2pa/dist/c2pa.worker.min.js?url'
import { C2paProvider } from '@contentauth/react'

import { I18nProvider, DataProvider, UiProvider } from './providers'
import App from './components/App'

function SywReact({
	locale,
	src,
	alt,
	caption,
	byline,
	variant,
	...props
}) {
	return (
		<C2paProvider
			config={{
				wasmSrc,
				workerSrc,
			}}
		>
			<I18nProvider
				locale={locale}
			>
				<DataProvider
					src={src}
					alt={alt}
					caption={caption}
					byline={byline}
				>
					<UiProvider
						variant={variant}
					>
						<App { ...props } />
					</UiProvider>
				</DataProvider>
			</I18nProvider>
		</C2paProvider>
	)
}

export default SywReact