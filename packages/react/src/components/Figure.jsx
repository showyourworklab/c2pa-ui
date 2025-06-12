import styles from '@syw/common/css/Figure.module.scss'

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