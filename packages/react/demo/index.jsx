import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { LOCALE_DEFAULT, DICTIONARIES } from 'syw-common/constants/i18n'
import { DEMO_IMAGE_URLS, DEMO_IMAGE_URL_DEFAULT, DEMO_IMAGE_URL_BASE } from 'syw-common/constants'
import SywLogo from 'syw-common/images/logo-dark.svg'
import SywReact from '$src/index'
import './style.css'

const Demo = () => {
	const [locale, setLocale] = useState(LOCALE_DEFAULT)
	const [demoImage, setDemoImage] = useState(DEMO_IMAGE_URL_DEFAULT)

	const handleLocaleChange = e => {
		const { value } = e.target
		setLocale(value)
	}

	const handleImageChange = e => {
		const { value } = e.target
		setDemoImage(value)
	}

	const handleEvent = (type, event, manifest) => {
		// console.log(type, event, manifest)
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
							value={demoImage}
							onChange={handleImageChange}
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
					src={`${DEMO_IMAGE_URL_BASE}/${demoImage}`}
					caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
					byline='Lectus Vitae / Tristique Imperdiet'
					onEvent={handleEvent}
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