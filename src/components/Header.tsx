import { useTranslation } from '../i18n/useTranslation'

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { t, lang, setLang } = useTranslation()
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-sand flex items-center justify-between px-4 h-14 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-sand transition-colors"
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-ink mb-1 rounded" />
          <span className="block w-5 h-0.5 bg-ink mb-1 rounded" />
          <span className="block w-5 h-0.5 bg-ink rounded" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber flex items-center justify-center">
            <span className="text-white font-bold text-xs">ط</span>
          </div>
          <span className="font-display font-bold text-ink text-base hidden sm:block">TAQAT Academy</span>
        </div>
      </div>
      <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        className="px-3 py-1.5 rounded-full bg-sand hover:bg-sand-strong text-sm font-medium text-ink transition-colors border border-sand-strong"
        aria-label="Toggle language"
      >
        {t('lang.toggle')}
      </button>
    </header>
  )
}
