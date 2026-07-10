import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { classNames, getObjectValue, getAvailableTabs } from 'syw-common/helpers'
import { useI18nContext } from '$src/context'

function ManifestContentTabsToggle({
	manifest,
	keys,
	className
}) {
	const { getText } = useI18nContext()
	
	const availableTabs = useMemo(() =>
		getAvailableTabs(keys, manifest)
	, [keys, manifest])

	return (
		<div
			className={classNames(
				'ManifestContentTabsToggle',
				className
			)}
		>
			<Tabs.List
				className={classNames('ManifestContentTabsToggleList')}
			>
				{keys?.map((key) => (
					<Tabs.Trigger
						key={key}
						value={key}
						disabled={!availableTabs.includes(key)}
						className={classNames('ManifestContentTabsToggleTrigger')}
					>
						{getText("tab", key)}
					</Tabs.Trigger>
				))}
				<Tabs.Indicator
					className={classNames('ManifestContentTabsToggleListIndicator')}
				/>
			</Tabs.List>
		</div>
	)
}

export default ManifestContentTabsToggle