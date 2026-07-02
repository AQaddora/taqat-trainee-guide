import Layout from './components/Layout'
import { useTranslation } from './i18n/useTranslation'
import Intro from './sections/Intro'
import SignUp from './sections/SignUp'
import Courses from './sections/Courses'
import Workroom from './sections/Workroom'
import Hosting from './sections/Hosting'
import FAQ from './sections/FAQ'

function GuideContent() {
  const { t } = useTranslation()
  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-display font-bold text-ink mb-3">{t('site.title')}</h1>
        <p className="text-lg text-ink/60">{t('site.subtitle')}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {['6 sections', '~15 min read', 'Hosting deep-dive included'].map(tag => (
            <span key={tag} className="text-xs bg-amber/10 text-amber/80 px-2.5 py-1 rounded-full font-medium border border-amber/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Intro />
      <SignUp />
      <Courses />
      <Workroom />
      <Hosting />
      <FAQ />
      <footer className="mt-16 pt-6 border-t border-sand text-center text-xs text-ink/30">
        <p>TAQAT Academy · <a href="https://taqat.academy" className="hover:text-amber transition-colors">taqat.academy</a></p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <Layout>
      <GuideContent />
    </Layout>
  )
}
