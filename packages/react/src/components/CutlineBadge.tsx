import { classNames } from 'syw-common/helpers'
import { ManifestType } from 'syw-common/types';
import { useDataContext } from '$src/context/data'
import Icon from './Icon';

const CutlineBadge = () => {
	const { types } = useDataContext();
	const originType = types[0] as ManifestType;
	const originTypeKey = originType?.key;
	// TODO: Expand test beyond origin
	const aiUsed = originTypeKey === "ai";
	return (
		<div
			className={classNames('CutlineBadge')}
		>
			<Icon
				type={`alert-${aiUsed ? "ai" : "noai"}`}
				className={classNames('CutlineBadgeIcon')}
			/>
			<div
				className={classNames('CutlineBadgeInner')}
			>
				{aiUsed
					? "Made with AI"
					: "No AI used"
				}
				
			</div>
		</div>
	)
}

export default CutlineBadge