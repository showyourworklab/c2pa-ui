import React, { useState } from 'react'
import { DataContext } from '/src/context/data'

const DataProvider = ({
	src,
    alt,
    caption,
    byline,
	children
}) => {
	const [status, setStatus] = useState("validating")
    const [manifests, setManifests] = useState([])

	return (
		<DataContext.Provider
			value={{
				src,
                alt,
                caption,
                byline,
				status,
				setStatus,
                manifests,
                setManifests
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export default DataProvider