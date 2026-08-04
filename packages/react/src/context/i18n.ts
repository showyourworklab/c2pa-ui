import { createContext, useContext } from 'react'
import type { DictionaryKey } from 'syw-common/types/i18n'
import { LOCALE_DEFAULT } from 'syw-common/constants/i18n'

interface I18nContextValue {
	locale: string
	getText: (...keys: DictionaryKey[]) => string | null
}

const I18nContext = createContext<I18nContextValue>({
	locale: LOCALE_DEFAULT,
	getText: (...keys) => null,
})

const useI18nContext = () => useContext(I18nContext)

export { I18nContext, useI18nContext }
