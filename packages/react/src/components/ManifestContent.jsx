import { classNames } from 'syw-common/helpers'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
import ManifestTable from './ManifestTable'
import ManifestContentTabs from './ManifestContentTabs'

function ManifestContent({ tabKeys, manifest }) {
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
				<ManifestContentTabs
					keys={tabKeys}
					manifest={manifest}
				/>
			</div>
		</div>
	)
}

export default ManifestContent