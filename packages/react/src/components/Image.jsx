import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'

const Image = () => {
	const {
		src,
		alt,
	} = useDataContext()

	return (
		<div
			className={classNames('Image')}
		>
			<img
				src={src}
				alt={alt}
				className={classNames('ImageImg')}
			/>
		</div>
	)
}

export default Image