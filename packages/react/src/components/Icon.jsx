import { useMemo } from 'react'
import { BadgeInfo, Camera, Check, Ellipsis, SquarePen, Sparkles, TriangleAlert, X } from 'lucide-react'
import {  ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH } from 'syw-common/constants'
import { classNames } from 'syw-common/helpers'

export const ICONS = {
	origin: BadgeInfo,
	validating: Ellipsis,
	trusted: Check,
	valid: Check,
	invalid: X,
	unknown: TriangleAlert,
	camera: Camera,
	edit: SquarePen,
	ai: Sparkles,
	close: X,
}

const Icon = ({
	type,
	size = ICON_DEFAULT_SIZE,
	strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
	className
}) => {

	const IconComponent = useMemo(() =>
		ICONS[type]
	, [type])

	return (
		IconComponent ?
			<IconComponent
				size={size}
				strokeWidth={strokeWidth}
				className={classNames(
					'Icon',
					`Icon_${type}`,
					className
				)}
			/>
		: null
	)
}

export default Icon