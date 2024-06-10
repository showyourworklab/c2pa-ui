import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	generateVerifyUrl,
	selectProducer,
	createL2ManifestStore,
} from 'c2pa'
import { useC2pa } from '@contentauth/react'
import useC2paPrereleaseData from './useC2paPrereleaseData'

const useC2paData = src => {
	// let c2paData, hasC2pa
	let c2paProvenance = useC2pa(src)

	const c2paData = useMemo(() => {
		let data
		if(c2paProvenance) {
			const { manifestStore } = c2paProvenance ?? {}
			const { activeManifest } = manifestStore ?? {}
			const producer = activeManifest ? selectProducer(activeManifest) : null
			const srcUrl = new URL(src, document.baseURI).href
			const verifyUrl = generateVerifyUrl(srcUrl)

			console.log({
				manifestStore,
				activeManifest,
				producer,
				srcUrl,
				verifyUrl
			})

			data = {
				authorship: {
					credit: producer?.name
				}
			}
		} else {
			data = useC2paPrereleaseData(src)
		}
		return data
	}, [src, c2paProvenance])

	return {
		// hasC2pa,
		c2paData,
		// c2paVerifyUrl,
		// c2paManifest,
	}
}

export default useC2paData