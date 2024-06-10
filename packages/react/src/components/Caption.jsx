import React from 'react'

import styles from '$common/css/Caption.module.scss'
import { useDataContext } from '$src/context/data'

const Caption = () => {
	const { caption, byline } = useDataContext()
	return caption || byline ? (
		<figcaption
			className={styles.Caption}
		>
			<div
				className={styles.CaptionInner}
			>
				{caption}&nbsp;
				<em
					className={styles.CaptionByline}
				>
					{byline}
				</em>
			</div>
		</figcaption>
	) : null
}

export default Caption