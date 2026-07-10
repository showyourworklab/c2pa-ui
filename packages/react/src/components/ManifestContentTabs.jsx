import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getAvailableTabs } from 'syw-common/helpers'
import { useI18nContext } from '$src/context'
import Map from './Map'
import Actions from './Actions'
import Icon from './Icon'

function ManifestContentTabs({
	manifest,
	keys
}) {
	const { getText } = useI18nContext()

	const availableTabs = useMemo(() =>
		getAvailableTabs(keys, manifest)
	, [keys, manifest])
	
	return (
		<div
			className={classNames('ManifestContentTabs')}
		>
			{availableTabs?.map((key) => (
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
								className={classNames(
									'ManifestContentTabsThumbnail',
									!manifest?.thumbnail ? 'ManifestContentTabsThumbnail_missing' : null,
								)}
							>
								{manifest?.thumbnail ?
									<img
										alt=''
										src={manifest?.thumbnail}
										className={classNames('ManifestContentTabsThumbnailImage')}
									/>
								: <Icon type="missing" />}
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