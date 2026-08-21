import { classNames } from 'syw-common/helpers'
import { getVerifyUrl } from 'syw-common/helpers/c2pa'
import { VERIFY_BASE_URL } from 'syw-common/constants'
import { useDataContext, useI18nContext } from '$src/context'

const ProvenanceVerify = () => {
	const { getText } = useI18nContext()
	const { src } = useDataContext()

	const verifyUrl = getVerifyUrl(src ?? '')

	return (
		<div
			className={classNames('ProvenanceVerify')}
		>
			{getText('verify', 'pre')}&nbsp;
			<a
				href={verifyUrl}
				target='_blank'

			>
				{VERIFY_BASE_URL}
			</a>
		</div>
	)
}

export default ProvenanceVerify