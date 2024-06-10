import React, { createContext, useContext } from 'react'

const I18nContext = createContext({
	locale: null,
	setLocale: () => null,
	dictionary: false,
	getText: () => null,
});

const useI18nContext = () => useContext(I18nContext)

export { I18nContext, useI18nContext }