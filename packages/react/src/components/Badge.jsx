import { classNames } from 'syw-common/helpers'

const Badge = ({
	type,
	value,
	children,
	className
}) => {
	return (
		<div
			className={classNames(
				'Badge',
				className,
				type ? `Badge_${type}` : null,
				value ? `Badge_${value}` : null
			)}
		>
			{children}
		</div>
	)
}

export default Badge