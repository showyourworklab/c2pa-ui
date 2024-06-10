import React from 'react'

import styles from '$common/css/Figure.module.scss'
// import { Header } from '/src/components/Header'
// import { Footer } from '/src/components/Footer'

const Figure = ({
	children
}) => {
	return (
		<figure
			className={styles.Figure}
		>
			{children}
		</figure>
	)
}

export default Figure