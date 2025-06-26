import styles from 'syw-common/css/ImageCompare.module.css'
import { useUiContext } from '$src/context/ui'

const ImageCompare = () => {
	const {
		compareImage,
		comparePosition
	} = useUiContext()

	return (
		<div
			className={styles.ImageCompare}
			style={{
				left: `${comparePosition?.clientX}px`,
				top: `${comparePosition?.clientY}px`,
			}}
		>
			<img
				src={compareImage}
				alt={""}
				className={styles.ImageCompareImg}
			/>
		</div>
	)
}

export default ImageCompare