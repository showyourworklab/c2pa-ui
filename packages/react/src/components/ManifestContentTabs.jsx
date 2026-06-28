import { Tabs } from '@ark-ui/react/tabs'
import { useI18nContext } from '$src/context'
import { classNames } from 'syw-common/helpers'
import Map from './Map'
import Actions from './Actions'

function ManifestContentTabs({
	manifest,
	keys
}) {
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
									src={manifest?.thumbnail}
									className={classNames('ManifestContentTabsThumbnailImage')}
								/>
							</div>
						: key === "location" && manifest?.location ?
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