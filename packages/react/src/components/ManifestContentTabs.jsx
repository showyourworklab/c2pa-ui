import { Tabs } from '@ark-ui/react/tabs'
import { useI18nContext } from '$src/context'
import { classNames, getObjectValue } from 'syw-common/helpers'
import { MANIFEST_PRIMARY_KEYS, MANIFEST_CONTENT_TAB_KEYS } from 'syw-common/constants'
import Map from './Map'
import Actions from './Actions'
import ManifestTable from './ManifestTable'

function ManifestContentTabs({ manifest, keys }) {
	const { getText } = useI18nContext()
	
	return (
		<div
			className={classNames('ManifestContentTabs')}
		>
			{keys?.map((key) => (
				<Tabs.Content
					key={key}
					value={key}
					className={classNames(
						'ManifestContentTabsContent',
						`ManifestContentTabsContent_${key}`
					)}
				>
					<div
						className={classNames('ManifestContentTabsContentInner')}
					>
						{key === "thumbnail" ?
							<div
								className={classNames('ManifestContentTabsThumbnail')}
							>
								<img
									alt=''
									src={manifest?.thumbnail?.value}
									className={classNames('ManifestContentTabsThumbnailImage')}
								/>
							</div>
						: key === "location" ?
							<Map
								location={manifest?.location}
							/>
						: key === "actions" ?
							<Actions
								actions={manifest?.actions}
							/>
						: null}
					</div>
				</Tabs.Content>
			))}
		</div>
	)
}

export default ManifestContentTabs