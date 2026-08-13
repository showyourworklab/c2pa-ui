import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';
import { DEMO_IMAGES } from 'syw-common/constants/demo'
import { LOCALE_DEFAULT, DICTIONARIES } from 'syw-common/constants/i18n'
import { VARIANT_KEYS, VARIANT_DEFAULT } from 'syw-common/constants'
import SywLogo from 'syw-common/images/logo-dark.svg'
import SywReact from '$src/index'
import 'syw-common/css/globals.css'
import 'syw-docs/src/styles.css'
import C2PA_INTERIM_TRUST_LIST from '../../common/trustlists/c2pa-interim';

const Demo = () => {
	const [locale, setLocale] = useState(LOCALE_DEFAULT)
	const [variant, setVariant] = useState(VARIANT_DEFAULT)
	const [demoImage, setDemoImage] = useState(DEMO_IMAGES[0])
	const [demoImageIndex, setDemoImageIndex] = useState(0)

	const handleLocaleChange = e => {
		const { value } = e.target
		setLocale(value)
	}

	const handleVariantChange = e => {
		const { value } = e.target
		setVariant(value)
	}

	const handleImageChange = e => {
		const { value } = e.target
		setDemoImage(DEMO_IMAGES[Number(value)])
		setDemoImageIndex(Number(value))
	}

	const handleEvent = (type, event, manifest) => {
		// console.log(type, event, manifest)
	}

	return (
		<main
			id="docs"
		>
			<header>
				<a
					href="https://showyourworklab.org"
					target="_blank"
				>
					<img
						src={SywLogo}
						alt="Show Your Work Lab logo"
						id="logo"
					/>
				</a>
			</header>

			<hgroup>
				<h1>
					The Show Your Work UI
				</h1>
				<h2>
					<var>syw-react</var>
				</h2>
				<p><strong><a href="../react">React</a></strong> and <strong><a href="../svelte">Svelte</a></strong> component to embed images with their C2PA data in a user-friendly interface</p>
				<p>
					<a
						href="https://github.com/showyourworklab/syw/"
						target="_blank"
						rel="noopener noreferrer"
						className="button"
						data-icon="github"
					>
						View code
					</a>
				</p>
			</hgroup>

			<section>
				<header>
					<div>
						<label
							htmlFor="select-image"
						>
							Select image to demo:
						</label>
						<select
							id="select-image"
							value={demoImageIndex}
							onChange={handleImageChange}
						>
							{DEMO_IMAGES.map((image, inex) =>
								<option
									key={inex}
									value={inex}
								>
									{image?.title?.[locale]}
								</option>
							)}
						</select>
					</div>
					<div>
						<label
							htmlFor="select-variant"
						>
							Select embed variant:
						</label>
						<select
							id="select-variant"
							value={variant}
							onChange={handleVariantChange}
						>
							{VARIANT_KEYS.map(key =>
								<option
									key={key}
									value={key}
								>
									{key}
								</option>
							)}
						</select>
					</div>
					<div>
						<label
							htmlFor="select-locale"
						>
							Select language of component:
						</label>					
						<select
							id="select-locale"
							value={locale}
							onChange={handleLocaleChange}
						>
							{Object.keys(DICTIONARIES).map(key =>
								<option
									key={key}
									value={key}
								>
									{key}
								</option>
							)}
						</select>
					</div>
				</header>
				<SywReact
					locale={locale}
					src={demoImage?.src}
					caption={demoImage?.caption?.[locale]}
					byline={demoImage?.byline}
					variant={variant}
					mapOptions={{
						// style: 'https://tiles.openfreemap.org/styles/positron'
					}}
					c2paOptions={{
						trustLists: [C2PA_INTERIM_TRUST_LIST]
					}}
					onEvent={handleEvent}
				/>
			</section>
		</main>
	)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Demo />);