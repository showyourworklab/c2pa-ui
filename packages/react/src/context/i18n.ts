import { createContext, useContext } from 'react'
import type { DictionaryKey } from 'syw-common/types/i18n'

interface I18nContextValue {
	locale: string | null
	getText: (...keys: DictionaryKey[]) => string | null
}

const I18nContext = createContext<I18nContextValue>({
	locale: null,
	getText: (...keys) => null,
})

const useI18nContext = () => useContext(I18nContext)

export { I18nContext, useI18nContext }
