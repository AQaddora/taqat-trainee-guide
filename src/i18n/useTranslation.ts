import { createContext, useContext, useState, createElement } from 'react'
import type { ReactNode } from 'react'
import { en, type TranslationKey } from './en'
import { ar } from './ar'

type Lang = 'en' | 'ar'
type LangCtx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TranslationKey) => string }

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: k => en[k] })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')
  const t = (k: TranslationKey) => (lang === 'ar' ? ar[k] : en[k])
  return createElement(LangContext.Provider, { value: { lang, setLang, t } }, children)
}

export const useTranslation = () => useContext(LangContext)
