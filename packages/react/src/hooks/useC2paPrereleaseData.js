import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ContentAuth } from '@contentauth/sdk'
import wasmSrc from '@contentauth/sdk/dist/assets/wasm/toolkit_bg.wasm?url'
import workerSrc from '@contentauth/sdk/dist/cai-sdk.worker.js?url'

import { ASSERTION_KEY } from '$src/constants'

const getAssertionData = (provenance, assertion) => {
	// console.log(this.provenance)
	let data = {};
	provenance?.claims?.forEach((claim, key) => {
		if(claim.assertions.get(assertion)) {
			data = { ...data, ...claim.assertions.get(assertion).data };
		}
	})
	return data;
}

const parseContentAuthArray = (prefix, arr) => {
	if(arr) {
		arr = arr.map((obj) => {
			const newObj = {};
			const keys = Object.keys(obj).map((k, i) => {
				const splitArr = k.replace(prefix, '').split(/(?=[A-Z])/);
				const newKey = splitArr[splitArr.length - 1].toLowerCase();
				newObj[newKey] = obj[k];
			});
			return newObj;
		});
	}
	return arr;
};

const getNestedValue = (provenance, assertionKey, key) => {
	let value;
	const searchKeys = (obj, key) => {
		if(typeof obj !== 'object') return;
		Object.keys(obj).forEach(k => {
			if(k === key) return value = obj[k];
			if(typeof obj[k] === 'object') return searchKeys(obj[k], key);
		});
 	}
 	let assertionsData = getAssertionData(provenance, assertionKey);
 	searchKeys(assertionsData, key);
 	return value;
}

const getIptcLocation = (provenance) => {
	const data = getNestedValue(provenance, 'stds.iptc.photo-metadata', 'Iptc4xmpExt:LocationCreated');
	if(!data) return;
	const fields = ['Iptc4xmpExt:City', 'Iptc4xmpExt:ProvinceState', 'Iptc4xmpExt:CountryName'];
	const locationStr = fields.map(f => data[f]).filter(d => d).join(', ');
	return locationStr;
}

//https://c2pa.org/specifications/specifications/1.0/specs/C2PA_Specification.html#_exif_information
const getGpsTime = (provenance) => {
	const data = getNestedValue(provenance, 'stds.exif', 'exif:GPSTimeStamp');
	if(!data) return;
    // We are parsing the invalid legacy time string used in this project
    // Not what the C2PA standard tells us
    // This legacy string looks like: 2022:01:25 01:16:41 +0000
    // This is unfortunately not a valid timestamp by RFC or ISO and so must be
    // parsed manually.
    // Convert into real format: 2022-01-25T01:16:41+0000
	const timeArr = data.split(/[ :]/);
    const timeStr = `${timeArr[0]}-${timeArr[1]}-${timeArr[2]}T${timeArr[3]}:${timeArr[4]}:${timeArr[5]}${timeArr[6]}`;
    // Now that's parsed and converted into a human readable format:
    // Dec 19, 2012, 10:00:00 PM EST
	return Date(timeStr).toLocaleString('en-US', {dateStyle: 'medium', timeStyle: 'long'});
}

const getVerifyUrl = (src, beta = false) => {
	return `https://verify${beta ? '-beta' : ''}.contentauthenticity.org/inspect?source=${src}`;
}

const getC2paPrereleaseData = async (src, provenance) => {
	const data = {
		'authorship': {
			'caption': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipCaption'),
			'credit': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipCredit'),
			'license': {
				'type': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseType'),
				'year': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseYear'),
				'holder': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseHolder'),
				'label': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseLabel'),
				'desc': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseDesc'),
				'url': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipLicenseUrl'),
			},
			'ethics': {
				'label': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipEthicsLabel'),
				'desc': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipEthicsDescription'),
			},
			'bio': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipBio'),
			'website': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipWebsite'),
			'contact': {
				'info': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipContactInfo'),
				'rights': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipContactRights'),
			},
			'location': getIptcLocation(provenance),
			'time': getGpsTime(provenance),
			'verify': getVerifyUrl(src, true),
			'registration': parseContentAuthArray('fourcorners:', getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:authorshipRegistration')),
		},
		'backstory': {
			'text': getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:backstoryText'),
			'media': parseContentAuthArray('fourcorners:', getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:backstoryMedia')),
		},
		'imagery': {
			'media': parseContentAuthArray('fourcorners:', getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:imageryMedia')),
		},
		'links': {
			'links': parseContentAuthArray('fourcorners:', getNestedValue(provenance, ASSERTION_KEY, 'fourcorners:linksLinks')),
		}
	};
	return data;
}

const readC2paPrereleaseProvenance = async (src) => {
	try {
		const caSdk = new ContentAuth({
			wasmSrc: wasmSrc,
			workerSrc: workerSrc
		})

		const c2paProvenance = caSdk && src
			? await caSdk.processImage(src)
			: null

		if(c2paProvenance?.exists) {
			return c2paProvenance
		} {
			return null
		}
	} catch (error) {
		console.warn(error)
		return null
	}
}

const useC2paPrereleaseData = async src => {
	const provenance = await readC2paPrereleaseProvenance(src)
	const data = await getC2paPrereleaseData(src, provenance)
	return data
}

export default useC2paPrereleaseData