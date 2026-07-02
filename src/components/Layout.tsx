import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { LangProvider, useTranslation } from '../i18n/useTranslation'
import Header from './Header'
import Sidebar from './Sidebar'

function LayoutInner({ children }: { children: ReactNode }) {
  const { lang } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-paper font-sans">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <LayoutInner>{children}</LayoutInner>
    </LangProvider>
  )
}
