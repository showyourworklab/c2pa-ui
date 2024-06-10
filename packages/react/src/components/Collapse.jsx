import { useEffect, useMemo, useRef, useState } from 'react'
// import { Collapse as ReactCollapse } from 'react-collapse'
import { useCollapse } from 'react-collapsed'

import styles from '$common/css/Collapse.module.scss'
import { joinClassNames } from '$common/helpers'

const DURATION = 200
const DURATION_PADDING = 10

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

	const collapseProps = getCollapseProps()

	return (
		<div
			{...getCollapseProps()}
			className={className}
			aria-labelledby={null}
			id={null}
			// theme={theme}
			// isOpened={open}
		>
			<div className={styles.CollapseInner}>
				{children}
			</div>
		</div>
	)

	// const theme = useMemo(() => ({
	// 	collapse: joinClassNames('c2paUi-Collapse', open ? 'c2paUi-Collapse_open' : null),
	// 	content: 'c2paUi-CollapseContent'
	// }), [open])

	// return (
	// 	<ReactCollapse
	// 		theme={theme}
	// 		isOpened={open}
	// 	>
	// 		<div>
	// 			{children}
	// 		</div>
	// 	</ReactCollapse>
	// )

	// const [height, setHeight] = useState(0)
	// const [innerHeight, setInnerHeight] = useState(0)
	// const innerRef = useRef(null)

	// const className = useMemo(() => [
	// 	styles.Collapse,
	// 	open ? styles.Collapse_open : null
	// ].filter(c => c).join(' '), [open])

	// useEffect(() => {
	// 	if(open) {
	// 		// Set to inner height and then unset after animation
	// 		setHeight(innerHeight)
	// 		setTimeout(() => setHeight(null), DURATION + DURATION_PADDING)
	// 	} else {
	// 		setHeight(innerHeight)
	// 		setTimeout(() => setHeight(0), DURATION_PADDING)
	// 	}
	// }, [open, innerHeight])

	// useEffect(() => {
	// 	const handleResize = () => {
	// 		const rect = innerRef?.current?.getBoundingClientRect()
	// 		const rectHeight = rect?.height
	// 		setInnerHeight(rectHeight)
	// 	}
	// 	handleResize()
	// 	window.addEventListener('resize', handleResize)
	// 	return () => window.removeEventListener('resize', handleResize)
	// }, [open, innerRef, setInnerHeight])

	// return (
	// 	<div
	// 		// ref={ref}
	// 		className={className}
	// 		style={{ height }}
	// 	>
	// 		<div>
	// 			<div
	// 				ref={innerRef}
	// 				className={styles.CollapseInner}
	// 			>
	// 				{children}
	// 			</div>
	// 		</div>
	// 	</div>
	// )
}

export default Collapse