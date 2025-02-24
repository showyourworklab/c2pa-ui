import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import SywReact from '$src/index'
import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
import { DEMO_IMAGE_URLS, DEMO_IMAGE_URL_DEFAULT, DEMO_IMAGE_URL_BASE } from '$common/constants'
import SywLogo from '$common/images/logo-dark.svg'
import './style.css'

const Demo = () => {
	const [locale, setLocale] = useState(LOCALE_DEFAULT)
	const [demoImage, setDemoImage] = useState(DEMO_IMAGE_URL_DEFAULT)

	const onLocaleChange = e => {
		const { value } = e.target
		setLocale(value)
	}

	const onImageChange = e => {
		const { value } = e.target
		setDemoImage(value)
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
				<a href="../">syw</a>/react
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
				{Object.keys(DICTIONARIES).map(key =>
					<option
						key={key}
						value={key}
					>
						{key}
					</option>
				)}
			</select>

			<section>
				<header>
					<h2>Select image to demo:</h2>
					<select
						id="image"
						value={demoImage}
						onChange={onImageChange}
					>
						{DEMO_IMAGE_URLS.map(key =>
							<option
								key={key}
								value={key}
							>
								{key}
							</option>
						)}
					</select>
				</header>
				<SywReact
					locale={locale}
					src={`${DEMO_IMAGE_URL_BASE}/${demoImage}`}
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