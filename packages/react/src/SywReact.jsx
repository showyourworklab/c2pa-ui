import { C2paProvider, I18nProvider, DataProvider, UiProvider } from './providers'
import App from './components/App'

function SywReact({
	locale,
	src,
	alt,
	caption,
	byline,
	variant,
	c2paOptions,
	...props
}) {

	return (
		<C2paProvider
			c2paOptions={c2paOptions}
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