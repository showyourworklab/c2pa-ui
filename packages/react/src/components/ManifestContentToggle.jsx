import { Tabs } from '@ark-ui/react/tabs'
import { useI18nContext } from '$src/context'
import { classNames, getObjectValue } from 'syw-common/helpers'
import Map from './Map'
import Actions from './Actions'
import ManifestTable from './ManifestTable'

function ManifestContentToggle({ keys, manifest }) {
	const { getText } = useI18nContext()
	const disabledTabKeys = keys?.filter(key => {
		const value = getObjectValue(key, manifest)
		if(key === "location") {
			return !value
		} else if(key === "actions") {
			return !value?.length
		} else {
			return false
		}
	})
	return (
		<div
			className={classNames('ManifestContentTabsToggle')}
		>
			<Tabs.List
				className={classNames('ManifestContentTabsList')}
			>
				{keys?.map((key) => (
					<Tabs.Trigger
						key={key}
						value={key}
						disabled={disabledTabKeys.includes(key)}
						className={classNames('ManifestContentTabsTrigger')}
					>
						{getText("tab", key)}
					</Tabs.Trigger>
				))}
				<Tabs.Indicator
					className={classNames('ManifestContentTabsListIndicator')}
				/>
			</Tabs.List>
		</div>
	)
}

export default ManifestContentToggle