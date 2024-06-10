import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import './style.css'
import ImageLeica1 from '$common/images/leica-1.jpg'
import { LOCALE_DEFAULT, DICTIONARIES } from '$common/constants/i18n'
import C2paUiReact from '$src/index'

const Demo = () => {
	const [locale, setLocale] = useState(LOCALE_DEFAULT)

	const onLocaleChange = e => {
		const { value } = e.target
		setLocale(value)
	}

	return (
		<main>
			<h1>c2pa-ui/react</h1>
			<p>
				A React component that wraps a C2PA-compliant image in a UI to expose its provenance.
			</p>

			<select
				value={locale}
				// defaultValue={LOCALE_DEFAULT}
				onChange={onLocaleChange}
			>
				{Object.keys(DICTIONARIES).map(l =>
					<option
						key={l}
						value={l}
					>
						{l}
					</option>
				)}
			</select>
			<section>
				<h2>Image with C2PA data from Leica camera</h2>
				<C2paUiReact
					locale={locale}
					src={ImageLeica1}
					caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
					byline='Lectus Vitae / Tristique Imperdiet'
				/>
			</section>
			{/*<section>
				<h2>Image with C2PA data from Truepic Lens camera</h2>
				<C2paUiReact
					locale={locale}
					src='/demo/images/truepic-3.jpg'
					caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus.'
					byline='Lectus Vitae / Tristique Imperdiet'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with C2PA data from Adobe</h2>
				<C2paUiReact
					locale={locale}
					src='/demo/images/adobe-1.jpg'
					caption='Vestibulum eu sagittis tellus. Etiam aliquet luctus rhoncus. Donec tincidunt dui posuere, posuere nibh in, ornare magna. Proin facilisis nunc non arcu suscipit, in auctor lorem imperdiet. Cras sit amet mi et lorem volutpat lacinia id eu erat. Nulla a sapien sagittis, molestie magna id, sodales dui.'
					byline='Quisque Turpis Sapien'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with C2PA data from Nikon camera</h2>
				<C2paUiReact
					src='/demo/images/nikon-1.jpg'
					caption='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis est ut enim imperdiet lacinia. Etiam vitae volutpat eros. Cras sagittis condimentum lacus, sit amet mattis mauris convallis id.'
					byline='Lectus Vitae / Tristique Imperdiet'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with C2PA data from Leica camera</h2>
				<C2paUiReact
					locale='en'
					src='/demo/images/cai-cat-1.jpg'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with C2PA data from Leica camera</h2>
				<C2paUiReact
					locale='no'
					src='/demo/images/cai-cat-1.jpg'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with fake C2PA data from fake Leica camera</h2>
				<C2paUiReact
					src='/demo/images/cai-cat-2.jpg'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with pre-release C2PA data</h2>
				<C2paUiReact
					src='/demo/images/paul-ninson-c2pa.jpg'
				/>
			</section>*/}
			{/*<section>
				<h2>Image with no data</h2>
				<C2paUiReact
					src='/demo/images/paul-ninson.jpg'
				/>
			</section>*/}
		</main>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Demo />
	</React.StrictMode>,
	document.getElementById('root'),
)