import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'

const ImageCompare = () => {
	const {
		compareImage,
		comparePosition
	} = useUiContext()

	return (
		<div
			className={classNames('ImageCompare')}
			style={{
				left: `${comparePosition?.clientX}px`,
				top: `${comparePosition?.clientY}px`,
			}}
		>
			<img
				src={compareImage}
				alt={""}
				className={classNames('ImageCompareImg')}
			/>
		</div>
	)
}

export default ImageCompare