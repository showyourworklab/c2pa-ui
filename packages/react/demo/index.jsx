import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SywLogo from '$common/images/logo-dark.svg'

import './style.css'
import { DEMO_IMAGES, DEMO_IMAGE_DEFAULT } from '$common/images/demo'
import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
import C2paUiReact from '$src/index'

const Demo = () => {
	const [locale, setLocale] = useState(LOCALE_DEFAULT)
	const [image, setImage] = useState(DEMO_IMAGE_DEFAULT)

	const onLocaleChange = e => {
		const { value } = e.target
		setLocale(value)
	}

	const onImageChange = e => {
		const { value } = e.target
		setImage(value)
	}

	return (
		<main>
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
			<h1>
				<a href="../">c2pa-ui</a>/react
			</h1>
			<p>
				A React component that wraps a C2PA-compliant image in a UI to expose its provenance.
			</p>

			<select
				id="locale"
				value={locale}
				// defaultValue={LOCALE_DEFAULT}
				onChange={onLocaleChange}
			>
				{Object.keys(DICTIONARIES).map(i =>
					<option
						key={i}
						value={i}
					>
						{i}
					</option>
				)}
			</select>

			<section>
				<header>
					<h2>Select image to demo:</h2>
					<select
						id="image"
						value={image}
						onChange={onImageChange}
					>
						{Object.keys(DEMO_IMAGES).map(l =>
							<option
								key={l}
								value={l}
							>
								{l}
							</option>
						)}
					</select>
				</header>
				<C2paUiReact
					locale={locale}
					src={DEMO_IMAGES[image]}
					caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
					byline='Lectus Vitae / Tristique Imperdiet'
				/>
			</section>
		</main>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Demo />
	</React.StrictMode>,
	document.getElementById('root'),
)