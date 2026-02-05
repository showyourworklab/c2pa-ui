import { classNames } from 'syw-common/helpers'
import { useDataContext } from '$src/context/data'

const Caption = () => {
	const { caption, byline } = useDataContext()
	return caption || byline ? (
		<figcaption
			className={classNames('Caption')}
		>
			<div
				className={classNames('CaptionInner')}
			>
				{caption}&nbsp;
				<div
					className={classNames('CaptionByline')}
				>
					{byline}
				</div>
			</div>
		</figcaption>
	) : null
}

export default Caption