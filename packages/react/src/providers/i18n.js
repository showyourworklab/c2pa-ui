import React, { useCallback, useState } from 'react'

import { getLocaleText } from '$common/helpers/i18n'
import { I18nContext } from '/src/context/i18n'

const I18nProvider = ({
	locale,
	children
}) => {

	const getText = (...keys) => getLocaleText(locale, ...keys)

	return (
		<I18nContext.Provider
			value={{
				locale,
				getText,
			}}
		>
			{children}
		</I18nContext.Provider>
	)
}

export default I18nProvider