import { classNames } from 'syw-common/helpers'

const Figure = ({
	children
}) => {

	return (
		<figure
			className={classNames('Figure')}
		>
			{children}
		</figure>
	)
}

export default Figure