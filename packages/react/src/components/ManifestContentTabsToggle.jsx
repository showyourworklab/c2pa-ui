import { useMemo } from 'react'
import { Tabs } from '@ark-ui/react/tabs'
import { useI18nContext } from '$src/context'
import { classNames, getObjectValue } from 'syw-common/helpers'

function ManifestContentTabsToggle({
	manifest,
	keys
}) {
	const { getText } = useI18nContext()
	
	const disabledTabKeys = useMemo(() =>
		keys?.filter(key => {
			const value = getObjectValue(key, manifest)
			if(key === "location") {
				return !value
			} else if(key === "actions") {
				return !value?.length
			} else {
				return false
			}
		})
	, [keys, manifest]);

	return (
		<div
			className={classNames('ManifestContentTabsToggle')}
		>
			<Tabs.List
				className={classNames('ManifestContentTabsToggleList')}
			>
				{keys?.map((key) => (
					<Tabs.Trigger
						key={key}
						value={key}
						disabled={disabledTabKeys.includes(key)}
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