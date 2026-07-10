import ManifestTable from './ManifestTable'
import { classNames } from 'syw-common/helpers'
import { MANIFEST_PRIMARY_KEYS } from 'syw-common/constants'
import ManifestContentTabs from './ManifestContentTabs'
import ManifestContentTabsToggle from './ManifestContentTabsToggle'

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
				<ManifestContentTabsToggle
					keys={tabKeys}
					manifest={manifest}
					className={classNames('ManifestContentSecondaryTabsToggle')}
				/>
				<ManifestContentTabs
					keys={tabKeys}
					manifest={manifest}
				/>
			</div>
		</div>
	)
}

export default ManifestContent