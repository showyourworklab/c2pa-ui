import { useCallback } from 'react'
import { classNames, handleA11yClick } from 'syw-common/helpers'
import { useUiContext } from '$src/context/ui'

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