import React, { useMemo } from 'react'
import { DataContext } from '$src/context/data'
import { useI18nContext } from '$src/context/i18n'
import useC2pa from '$src/hooks/useC2pa'

const DataProvider = ({
	src,
	alt,
	caption,
	byline,
	children
}) => {
	const { locale } = useI18nContext()
	const c2paData = useC2pa({ src, locale })

	const value = useMemo(() => ({
		...c2paData,
		src,
		alt,
		caption,
		byline
	}), [c2paData, src, alt, caption, byline])

	return (
		<DataContext.Provider value={value}>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider