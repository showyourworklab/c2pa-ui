import React from 'react'

import styles from '$common/css/Figure.module.scss'

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