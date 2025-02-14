import { useMemo } from 'react'
import { useCollapse } from 'react-collapsed'

import styles from '$common/css/Collapse.module.scss'
import { joinClassNames } from '$common/helpers'

const Collapse = ({
	open = false,
	children
}) => {
	const { getCollapseProps, isExpanded } = useCollapse({
		isExpanded: open,
		defaultExpanded: false,
	})

	const className = useMemo(() =>
		joinClassNames(
			styles.Collapse,
			open ? styles.Collapse_open : false,
		)
	, [open])

	return (
		<div
			{...getCollapseProps()}
			className={className}
			aria-labelledby={null}
			id={null}
		>
			<div className={styles.CollapseInner}>
				{children}
			</div>
		</div>
	)
}

export default Collapse