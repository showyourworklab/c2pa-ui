import React, { useCallback, useState } from 'react'

import { getLocaleText } from '$common/helpers/i18n'
import { DataContext } from '/src/context/data'

const DataProvider = ({
	src,
    alt,
    caption,
    byline,
	children
}) => {
    const [manifests, setManifests] = useState([])

	return (
		<DataContext.Provider
			value={{
				src,
                alt,
                caption,
                byline,
                manifests,
                setManifests
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider