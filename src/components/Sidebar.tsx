import { useTranslation } from '../i18n/useTranslation'
import type { TranslationKey } from '../i18n/en'

const sections: { key: TranslationKey; id: string; icon: string }[] = [
  { key: 'nav.intro', id: 'intro', icon: '📖' },
  { key: 'nav.signup', id: 'signup', icon: '🔐' },
  { key: 'nav.courses', id: 'courses', icon: '🎓' },
  { key: 'nav.workroom', id: 'workroom', icon: '🛠️' },
  { key: 'nav.hosting', id: 'hosting', icon: '🚀' },
  { key: 'nav.faq', id: 'faq', icon: '❓' },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={[
          'fixed lg:static top-0 z-30 w-64 h-screen lg:h-auto bg-white border-e border-sand flex flex-col transition-all duration-200 shrink-0',
          open ? 'start-0' : '-start-64 lg:start-0',
        ].join(' ')}

      >
        <div className="p-4 border-b border-sand">
          <div className="text-xs font-semibold text-amber uppercase tracking-wider">Complete Guide</div>
          <div className="text-xs text-ink/50 mt-0.5">دليل شامل</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink/70 hover:bg-sand hover:text-ink transition-colors mb-0.5 group"
            >
              <span className="text-base">{s.icon}</span>
              <span className="font-medium group-hover:text-amber transition-colors">{t(s.key)}</span>
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-sand">
          <a
            href="https://taqat.academy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-ink/40 hover:text-amber transition-colors"
          >
            taqat.academy →
          </a>
        </div>
      </aside>
    </>
  )
}
