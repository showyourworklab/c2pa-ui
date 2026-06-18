import { classNames } from 'syw-common/helpers'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
import ManifestTable from './ManifestTable'

function ManifestContent({ manifest }) {
	return (
		<div
			className={classNames('ManifestContent')}
		>
			<div
				className={classNames('ManifestContentPrimary')}
			>
				<ManifestTable
					keys={MANIFEST_PRIMARY_KEYS}
					manifest={manifest}
				/>
			</div>
			<div
				className={classNames('ManifestContentSecondary')}
			>
				{/* <ManifestTable
					keys={MANIFEST_SECONDARY_KEYS}
					manifest={manifest}
				/> */}
				<div
					className={classNames('ManifestContentThumbnail')}
				>
					<img
						alt=''
						src={manifest?.thumbnail?.value}
						className={classNames('ManifestContentThumbnailImage')}
					/>
				</div>
			</div>
		</div>
	)
}

export default ManifestContent