import { classNames } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'
import { useI18nContext } from '$src/context/i18n'

const Thumbnail = () => {
	const {
		thumbnail,
		thumbnailPosition
	} = useUiContext()
	const { getText } = useI18nContext()

	return (
		<div
			className={classNames('Thumbnail')}
			style={{
				left: `${thumbnailPosition?.clientX}px`,
				top: `${thumbnailPosition?.clientY}px`,
			}}
		>
			{thumbnail ?
				<img
					src={thumbnail}
					alt={""}
					className={classNames('ThumbnailImg')}
				/>
			: null}
			{!thumbnail ?
				<div
					className={classNames('ThumbnailMissing')}
				>
					{getText('thumbnail', 'missing')}
				</div>
			: null}
		</div>
	)
}

export default Thumbnail