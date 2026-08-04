import { useEffect, useState } from 'react'
import { classNames, convertJumbfToDataUri } from 'syw-common/helpers'
import type { ManifestGeneratorEntry } from 'syw-common/types/c2pa'
import { useDataContext } from '$src/context/data'

function Generator({ name, icon }: ManifestGeneratorEntry) {
	const { reader } = useDataContext()
	const [src, setSrc] = useState<string | null>(null)

	useEffect(() => {
		let cancelled = false
		setSrc(null)
		if(icon?.identifier && icon?.format) {
			convertJumbfToDataUri(reader, icon.identifier, icon.format).then(uri => {
				if(!cancelled) setSrc(uri)
			})
		}
		return () => { cancelled = true }
	}, [reader, icon?.identifier, icon?.format])

	return (
		<div
			className={classNames('Generator')}
		>
			{src ?
				<img
					alt=""
					src={src}
					className={classNames('GeneratorIcon')}
				/>
			: null}
			<span>
				{name}
			</span>
		</div>
	)
}

export default Generator
