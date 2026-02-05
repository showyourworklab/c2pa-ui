import { useMemo } from 'react'
import { useCollapse } from 'react-collapsed'
import { classNames } from 'syw-common/helpers'

const Collapse = ({
	open = false,
	children
}) => {
	const { getCollapseProps, isExpanded } = useCollapse({
		isExpanded: open,
		defaultExpanded: false,
	})

	const className = useMemo(() =>
		classNames(
			'Collapse',
			open ? 'Collapse_open' : false,
		)
	, [open])

	return (
		<div
			{...getCollapseProps()}
			className={className}
			aria-labelledby={null}
			id={null}
		>
			<div className={classNames('CollapseInner')}>
				{children}
			</div>
		</div>
	)
}

export default Collapse