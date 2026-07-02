# Guide and Book Sprint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy two content apps — App A (TAQAT Academy trainee guide) in this repo and App B (AI Mastery Recipe Book) in a new private repo — both live on Dokku at `*.apps.taqat.academy`.

**Architecture:** Both apps are Vite+React+TypeScript+Tailwind CSS static sites, built to `dist/`, served by the `serve` package, deployed via the Dokku deploy agent from GitHub repos. App A lives in `AQaddora/taqat-trainee-guide` (this repo). App B lives in a new private repo `AQaddora/taqat-ai-recipes-book`.

**Tech Stack:** Node 20, Vite 5, React 18, TypeScript 5, Tailwind CSS 3, serve 14, Vitest 1 for smoke tests; deploy via ssh taqat-apps + JSON pipe to /opt/taqat/deploy-agent/agent.sh.

## Global Constraints

- Branch: `feat/guide-and-book`; merge App A PR to `AQaddora/taqat-trainee-guide` main; never force-push
- TAQAT brand: amber=#F2A937 accent, ink=#0A1A2F dark, paper=#F3EFE5 light, fonts: Plus Jakarta Sans (en) + Cairo (ar)
- Bilingual en+ar with correct RTL for Arabic; language toggle in header
- Zero invented features in App A — everything grounded in actual academy codebase
- App B: zero TODO/placeholder/proposal/CV/school-pricing artifacts anywhere; all 7 sessions as polished chapters
- Dokku app slugs: `academy-guide` and `ai-recipes` only; never touch existing apps
- `serve dist -p ${PORT:-3000}` as the start script (serve@14 in dependencies)
- No secrets committed; no production DB schema changes

---

## File Map

### App A (`/` — this repo root)
```
package.json              # Vite build + serve start
vite.config.ts
tailwind.config.ts
tsconfig.json
index.html
src/
  main.tsx
  App.tsx
  i18n/
    en.ts
    ar.ts
    useTranslation.ts
  components/
    Layout.tsx            # sidebar + header + RTL context
    Sidebar.tsx
    Header.tsx            # lang toggle
    ContentSection.tsx    # reusable section wrapper
    MockUI.tsx            # illustrative UI blocks (no real screenshots)
  pages/
    GuidePage.tsx         # main page — all guide sections
  sections/
    Intro.tsx
    SignUp.tsx
    Courses.tsx
    Workroom.tsx
    Hosting.tsx           # star section — deep dive
    FAQ.tsx
  tests/
    smoke.test.tsx        # renders without crash + key headings present
```

### App B (separate repo — bootstrap here then push)
```
package.json
vite.config.ts
tailwind.config.ts
tsconfig.json
index.html
src/
  main.tsx
  App.tsx
  i18n/
    en.ts
    ar.ts
    useTranslation.ts
  components/
    Layout.tsx
    Sidebar.tsx           # chapter TOC
    Header.tsx            # progress bar + lang toggle + notice bar
    NoticeBar.tsx         # "Available free for limited time" banner
    ChapterNav.tsx        # prev/next
  pages/
    Cover.tsx
    TOC.tsx
    ChapterPage.tsx
  chapters/
    ch1-foundations.tsx
    ch2-prompting.tsx
    ch3-studying.tsx
    ch4-creativity.tsx
    ch5-building.tsx
    ch6-productivity.tsx
    ch7-ethics.tsx
  resources/
    PromptCheatsheet.tsx
    SafetyGuide.tsx
  tests/
    smoke.test.tsx
```

---

## Task 1: Bootstrap App A (Vite+React+Tailwind)

**Files:**
- Create: `package.json`, `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/tests/smoke.test.tsx`

**Interfaces:**
- Produces: working `npm run build` → `dist/`, `npm start` serves on `$PORT`

- [ ] **Step 1: Write failing smoke test**

```tsx
// src/tests/smoke.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App A smoke', () => {
  it('renders without crash and shows guide heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /TAQAT Academy/i })).toBeDefined()
  })
})
```

- [ ] **Step 2: Run test — verify it fails**

```bash
cd /Users/aseel/Work/taqat-trainee-guide-feat-guide-and-book
npm test 2>&1 | head -20
```
Expected: error — packages not found

- [ ] **Step 3: Create package.json**

```json
{
  "name": "taqat-trainee-guide",
  "version": "1.0.0",
  "private": true,
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "vite",
    "build": "tsc -noEmit && vite build",
    "preview": "vite preview",
    "start": "serve dist -p ${PORT:-3000}",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "serve": "^14.2.4"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.6",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "jsdom": "^24.1.0",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.6",
    "typescript": "^5.5.3",
    "vite": "^5.3.4",
    "vitest": "^1.6.0"
  }
}
```

- [ ] **Step 4: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
})
```

- [ ] **Step 5: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false
  },
  "include": ["src"]
}
```

- [ ] **Step 6: Create tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A1A2F', text: '#13243B' },
        paper: { DEFAULT: '#F3EFE5', 2: '#F6F3EC' },
        sand: { DEFAULT: '#EAE3D4', strong: '#E2DBCC' },
        amber: { DEFAULT: '#F2A937', light: '#FFC25A', deep: '#C98F1E' },
        navy: { DEFAULT: '#2A63A8', soft: '#E8F0FA' },
        mint: { DEFAULT: '#1F9C7F', soft: '#E7F4EF' },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 7: Create index.html**

```html
<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TAQAT Academy — Trainee Guide</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-paper text-ink">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create src/main.tsx and src/tests/setup.ts**

`src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
```

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`src/tests/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Create minimal App.tsx that satisfies the smoke test**

```tsx
export default function App() {
  return (
    <div>
      <h1>TAQAT Academy Guide</h1>
    </div>
  )
}
```

- [ ] **Step 10: Install and run test**

```bash
cd /Users/aseel/Work/taqat-trainee-guide-feat-guide-and-book
npm install && npm test
```
Expected: PASS (1 test)

- [ ] **Step 11: Verify build**

```bash
npm run build 2>&1 | tail -10
```
Expected: `dist/` created, exit 0

- [ ] **Step 12: Commit**

```bash
git add package.json vite.config.ts tailwind.config.ts tsconfig.json index.html src/
git commit -m "feat: bootstrap Vite+React+Tailwind for academy-guide"
git push gh feat/guide-and-book
```

---

## Task 2: App A Layout (Sidebar + Header + i18n)

**Files:**
- Create: `src/i18n/en.ts`, `src/i18n/ar.ts`, `src/i18n/useTranslation.ts`
- Create: `src/components/Layout.tsx`, `src/components/Sidebar.tsx`, `src/components/Header.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `useLang()` hook → `{ lang, setLang }`, `useTranslation()` hook → `t(key)` fn
- Produces: `<Layout>` wrapping children with sidebar + header, RTL when lang==='ar'

- [ ] **Step 1: Write test**

```tsx
// Add to src/tests/smoke.test.tsx
it('renders language toggle button', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: /عربي|English/i })).toBeDefined()
})
it('sidebar contains all section links', () => {
  render(<App />)
  const links = screen.getAllByRole('link')
  const hrefs = links.map(l => l.getAttribute('href'))
  expect(hrefs.some(h => h?.includes('hosting'))).toBe(true)
})
```

- [ ] **Step 2: Create `src/i18n/en.ts`**

```ts
export const en = {
  'nav.intro': 'Introduction',
  'nav.signup': 'Sign Up & Sign In',
  'nav.courses': 'Courses',
  'nav.workroom': 'Workroom',
  'nav.hosting': 'Hosting',
  'nav.faq': 'FAQ',
  'lang.toggle': 'عربي',
  'site.title': 'TAQAT Academy — Complete Guide',
  'site.subtitle': 'From zero to hosted project — everything you need to know',
} as const
export type TranslationKey = keyof typeof en
```

- [ ] **Step 3: Create `src/i18n/ar.ts`**

```ts
import type { TranslationKey } from './en'
export const ar: Record<TranslationKey, string> = {
  'nav.intro': 'مقدمة',
  'nav.signup': 'التسجيل وتسجيل الدخول',
  'nav.courses': 'الدورات',
  'nav.workroom': 'غرفة العمل',
  'nav.hosting': 'الاستضافة',
  'nav.faq': 'الأسئلة الشائعة',
  'lang.toggle': 'English',
  'site.title': 'أكاديمية طاقات — الدليل الشامل',
  'site.subtitle': 'من الصفر إلى المشروع المنشور — كل ما تحتاج معرفته',
}
```

- [ ] **Step 4: Create `src/i18n/useTranslation.ts`**

```ts
import { createContext, useContext, useState, type ReactNode, createElement } from 'react'
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
```

- [ ] **Step 5: Create `src/components/Header.tsx`**

```tsx
import { useTranslation } from '../i18n/useTranslation'

export default function Header({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { t, lang, setLang } = useTranslation()
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-sand flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg hover:bg-sand" aria-label="menu">
          <span className="block w-5 h-0.5 bg-ink mb-1" />
          <span className="block w-5 h-0.5 bg-ink mb-1" />
          <span className="block w-5 h-0.5 bg-ink" />
        </button>
        <span className="font-display font-bold text-ink text-lg">طاقات Academy</span>
      </div>
      <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        className="px-3 py-1.5 rounded-full bg-sand hover:bg-sand-strong text-sm font-medium text-ink transition-colors"
      >
        {t('lang.toggle')}
      </button>
    </header>
  )
}
```

- [ ] **Step 6: Create `src/components/Sidebar.tsx`**

```tsx
import { useTranslation } from '../i18n/useTranslation'

const sections = [
  { key: 'nav.intro' as const, id: 'intro', icon: '📖' },
  { key: 'nav.signup' as const, id: 'signup', icon: '🔐' },
  { key: 'nav.courses' as const, id: 'courses', icon: '🎓' },
  { key: 'nav.workroom' as const, id: 'workroom', icon: '🛠' },
  { key: 'nav.hosting' as const, id: 'hosting', icon: '🚀' },
  { key: 'nav.faq' as const, id: 'faq', icon: '❓' },
]

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:static top-0 ${open ? 'start-0' : '-start-72'} lg:start-0 z-30 w-64 h-full lg:h-auto bg-white border-e border-sand flex flex-col transition-all duration-200`}>
        <div className="p-4 border-b border-sand">
          <div className="text-xs font-semibold text-amber uppercase tracking-wider">Complete Guide</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink/80 hover:bg-sand hover:text-ink transition-colors mb-0.5"
            >
              <span>{s.icon}</span>
              <span className="font-medium">{t(s.key)}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
```

- [ ] **Step 7: Create `src/components/Layout.tsx`**

```tsx
import { useState } from 'react'
import { LangProvider, useTranslation } from '../i18n/useTranslation'
import Header from './Header'
import Sidebar from './Sidebar'
import type { ReactNode } from 'react'

function LayoutInner({ children }: { children: ReactNode }) {
  const { lang } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-paper font-sans">
      <Header onMenuToggle={() => setSidebarOpen(o => !o)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0 max-w-3xl mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return <LangProvider><LayoutInner>{children}</LayoutInner></LangProvider>
}
```

- [ ] **Step 8: Update App.tsx to use Layout**

```tsx
import Layout from './components/Layout'

export default function App() {
  return (
    <Layout>
      <h1 className="text-3xl font-display font-bold text-ink mb-2">TAQAT Academy</h1>
      <p className="text-ink/70">Complete guide coming soon…</p>
    </Layout>
  )
}
```

- [ ] **Step 9: Run tests and build**

```bash
npm test && npm run build 2>&1 | tail -5
```
Expected: tests pass, dist/ created

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add layout, sidebar, header and i18n for academy-guide"
git push gh feat/guide-and-book
```

---

## Task 3: App A — Guide Content

**Files:**
- Create: `src/sections/Intro.tsx`, `SignUp.tsx`, `Courses.tsx`, `Workroom.tsx`, `Hosting.tsx`, `FAQ.tsx`
- Create: `src/components/ContentSection.tsx`, `src/components/MockUI.tsx`
- Modify: `src/App.tsx` (include all sections)
- Modify: `src/tests/smoke.test.tsx` (check all section headings)

**Interfaces:**
- Consumes: `useTranslation()` from Task 2
- Produces: complete single-page guide site

- [ ] **Step 1: Create `src/components/ContentSection.tsx`**

```tsx
import type { ReactNode } from 'react'

export default function ContentSection({ id, icon, title, children }: {
  id: string; icon: string; title: string; children: ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-display font-bold text-ink">{title}</h2>
      </div>
      <div className="space-y-4 text-ink/80 leading-relaxed">{children}</div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/MockUI.tsx`**

```tsx
export function MockLoginForm() {
  return (
    <div className="border border-sand rounded-xl p-5 bg-white max-w-sm shadow-sm">
      <div className="font-semibold text-ink mb-3">تسجيل الدخول / Sign In</div>
      <div className="space-y-2">
        <div className="h-9 bg-sand rounded-lg px-3 flex items-center text-sm text-ink/40">البريد الإلكتروني / Email</div>
        <div className="h-9 bg-sand rounded-lg px-3 flex items-center text-sm text-ink/40">كلمة المرور / Password</div>
        <div className="h-10 bg-amber rounded-lg flex items-center justify-center text-sm font-semibold text-white">دخول / Sign In</div>
      </div>
    </div>
  )
}

export function MockCourseCard() {
  return (
    <div className="border border-sand rounded-xl p-4 bg-white max-w-xs shadow-sm">
      <div className="h-28 rounded-lg bg-gradient-to-br from-amber/20 to-navy/10 mb-3 flex items-center justify-center text-4xl">🐍</div>
      <div className="font-semibold text-ink text-sm">Python for Beginners</div>
      <div className="text-xs text-ink/50 mt-1">12 videos · Quiz after each video</div>
      <div className="mt-3 h-8 bg-amber rounded-lg flex items-center justify-center text-xs font-semibold text-white">Enroll Now</div>
    </div>
  )
}

export function MockHostingTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="bg-ink rounded-xl p-4 font-mono text-sm overflow-x-auto">
      {lines.map((l, i) => (
        <div key={i} className={l.startsWith('$') ? 'text-amber' : 'text-white/70'}>{l}</div>
      ))}
    </div>
  )
}

export function MockDeployLog() {
  const logLines = [
    '$ git push origin main',
    'remote: Building with nixpacks...',
    'remote: ✓ Detected Node.js',
    'remote: ✓ Installing dependencies',
    'remote: ✓ npm run build',
    'remote: ✓ Deploy complete!',
    'remote: 🌍 https://my-app.apps.taqat.academy',
  ]
  return <MockHostingTerminal lines={logLines} />
}
```

- [ ] **Step 3: Create `src/sections/Intro.tsx`**

```tsx
import ContentSection from '../components/ContentSection'
import { useTranslation } from '../i18n/useTranslation'

export default function Intro() {
  const { lang } = useTranslation()
  if (lang === 'ar') return (
    <ContentSection id="intro" icon="📖" title="مرحباً في أكاديمية طاقات">
      <p>أكاديمية طاقات هي منصة تعليمية إلكترونية مجانية تخدم فلسطين ومنطقة الشرق الأوسط وشمال أفريقيا. ستجد فيها دورات تدريبية، جلسات مباشرة، اختبارات بعد كل فيديو، ومنصة استضافة للمشاريع تُمكّنك من نشر مشروعك للعالم.</p>
      <p className="font-semibold text-ink">ما الذي ستتعلمه من هذا الدليل؟</p>
      <ul className="list-disc list-inside space-y-1 ps-2">
        <li>كيفية التسجيل وإنشاء حسابك</li>
        <li>التسجيل في الدورات ومتابعة التعلم</li>
        <li>الانضمام إلى مجموعة والعمل في غرفة العمل</li>
        <li>استضافة مشروعك ونشره على الإنترنت — بالتفصيل</li>
        <li>الأسئلة الشائعة وحل المشكلات</li>
      </ul>
    </ContentSection>
  )
  return (
    <ContentSection id="intro" icon="📖" title="Welcome to TAQAT Academy">
      <p>TAQAT Academy is a free online learning platform serving Palestine and the wider MENA region. You'll find courses, live sessions, quizzes after every video, and a project hosting platform that lets you publish your work to the world.</p>
      <p className="font-semibold text-ink">What you'll learn in this guide:</p>
      <ul className="list-disc list-inside space-y-1 ps-2">
        <li>How to sign up and create your account</li>
        <li>Enrolling in courses and following your learning journey</li>
        <li>Joining a group and working in the Workroom</li>
        <li>Hosting your project and deploying it online — in depth</li>
        <li>FAQ and troubleshooting</li>
      </ul>
    </ContentSection>
  )
}
```

- [ ] **Step 4: Create `src/sections/SignUp.tsx`**

```tsx
import ContentSection from '../components/ContentSection'
import { MockLoginForm } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

export default function SignUp() {
  const { lang } = useTranslation()
  if (lang === 'ar') return (
    <ContentSection id="signup" icon="🔐" title="التسجيل وتسجيل الدخول">
      <p>تسجيل الدخول في أكاديمية طاقات سهل وموحد — نظام SSO واحد يعمل في جميع خدمات طاقات.</p>
      <h3 className="font-semibold text-ink text-lg mt-4">إنشاء حساب جديد</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2">
        <li>افتح <strong>taqat.academy</strong> واضغط على "تسجيل".</li>
        <li>أدخل اسمك الكامل، بريدك الإلكتروني، وكلمة مرور قوية.</li>
        <li>اختر نوع حسابك: طالب أو مدرب (الطلاب يبدأون هنا).</li>
        <li>إذا كنت طالباً، أضف معلومات اختيارية: واتساب، موقع إلكتروني، LinkedIn، GitHub.</li>
        <li>أكمل التحقق من البريد الإلكتروني — ستصلك رسالة برمز من 6 أرقام.</li>
      </ol>
      <h3 className="font-semibold text-ink text-lg mt-4">تسجيل الدخول</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2">
        <li>اضغط على "دخول" في أعلى الصفحة.</li>
        <li>أدخل بريدك الإلكتروني وكلمة مرورك، أو استخدم حسابك على Google.</li>
        <li>ستُحوَّل مباشرة إلى لوحة التحكم.</li>
      </ol>
      <h3 className="font-semibold text-ink text-lg mt-4">ملفك الشخصي</h3>
      <p>اضغط على صورتك في الزاوية لفتح صفحة الملف الشخصي. يمكنك إضافة صورة ملف، غلاف، نبذة، مهارات، ومشاريع portfolio. هذا هو وجهك في الأكاديمية — اجعله يعكس عملك الحقيقي.</p>
      <div className="mt-4"><MockLoginForm /></div>
    </ContentSection>
  )
  return (
    <ContentSection id="signup" icon="🔐" title="Sign Up & Sign In">
      <p>Authentication at TAQAT Academy is unified — one SSO system that works across all TAQAT services.</p>
      <h3 className="font-semibold text-ink text-lg mt-4">Creating a new account</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2">
        <li>Open <strong>taqat.academy</strong> and click "Sign Up".</li>
        <li>Enter your full name, email address, and a strong password.</li>
        <li>Choose your account type: Student or Trainer (most learners start as Student).</li>
        <li>As a student, optionally add your WhatsApp, personal website, LinkedIn, and GitHub.</li>
        <li>Complete email verification — you'll receive a 6-digit code by email.</li>
      </ol>
      <h3 className="font-semibold text-ink text-lg mt-4">Signing in</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2">
        <li>Click "Sign In" at the top of any page.</li>
        <li>Enter your email and password, or continue with Google.</li>
        <li>You're taken straight to your dashboard.</li>
      </ol>
      <h3 className="font-semibold text-ink text-lg mt-4">Your profile</h3>
      <p>Click your avatar in the corner to open your profile page. Add a profile picture, cover image, bio, skills list, and portfolio projects. This is your public face on the platform — make it reflect your real work.</p>
      <div className="mt-4"><MockLoginForm /></div>
    </ContentSection>
  )
}
```

- [ ] **Step 5: Create `src/sections/Courses.tsx`**

```tsx
import ContentSection from '../components/ContentSection'
import { MockCourseCard } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

export default function Courses() {
  const { lang } = useTranslation()
  if (lang === 'ar') return (
    <ContentSection id="courses" icon="🎓" title="الدورات التدريبية">
      <h3 className="font-semibold text-ink text-lg mt-2">اكتشاف الدورات والتسجيل</h3>
      <p>من لوحة التحكم، اضغط على "اكتشف" لتصفح الدورات المتاحة. يمكنك البحث بالاسم أو تصفية الدورات حسب 8 تصنيفات. اضغط على دورة لرؤية المنهج الكامل ومعلومات المدرب، ثم اضغط "سجّل الآن".</p>
      <h3 className="font-semibold text-ink text-lg mt-4">مشاهدة الفيديوهات والاختبارات</h3>
      <ul className="list-disc list-inside space-y-1 ps-2">
        <li><strong>الفيديوهات:</strong> انتقل إلى "دوراتي" واضغط على الدورة. ستجد المنهج كاملاً مع تحديد الدروس التي أكملتها.</li>
        <li><strong>الاختبار بعد كل فيديو:</strong> بعد كل فيديو، يظهر اختبار تلقائياً. يجب الإجابة عليه قبل الانتقال للدرس التالي.</li>
        <li><strong>مؤشر التقدم:</strong> يُحسب تلقائياً بناءً على الدروس المكتملة والاختبارات.</li>
        <li><strong>الجلسات المباشرة:</strong> تظهر الجلسات القادمة في صفحة الدورة — انضم من الرابط الموجود في الوقت المحدد.</li>
      </ul>
      <h3 className="font-semibold text-ink text-lg mt-4">الحضور والشهادات</h3>
      <p>يُسجَّل حضورك بناءً على إكمال الفيديوهات والجلسات المباشرة. عند إكمال الدورة، يمكنك الحصول على شهادة إتمام.</p>
      <div className="mt-4"><MockCourseCard /></div>
    </ContentSection>
  )
  return (
    <ContentSection id="courses" icon="🎓" title="Courses">
      <h3 className="font-semibold text-ink text-lg mt-2">Discovering and enrolling</h3>
      <p>From your dashboard, click "Explore" to browse available courses. Search by name or filter by one of 8 category chips. Click a course to see the full curriculum and trainer info, then press "Enroll Now".</p>
      <h3 className="font-semibold text-ink text-lg mt-4">Watching videos and quizzes</h3>
      <ul className="list-disc list-inside space-y-1 ps-2">
        <li><strong>Videos:</strong> Go to "My Courses" and click on a course. You'll see the full curriculum with checkmarks on completed lessons.</li>
        <li><strong>Quiz after every video:</strong> A quiz overlay appears automatically when a video ends. Answer it before moving to the next lesson.</li>
        <li><strong>Progress indicator:</strong> Calculated automatically from completed videos and passed quizzes.</li>
        <li><strong>Live sessions:</strong> Upcoming sessions appear on the course page — join from the link provided at session time.</li>
      </ul>
      <h3 className="font-semibold text-ink text-lg mt-4">Attendance and certificates</h3>
      <p>Attendance is tracked from video completions and live session participation. On completing a course, you can obtain a completion certificate.</p>
      <div className="mt-4"><MockCourseCard /></div>
    </ContentSection>
  )
}
```

- [ ] **Step 6: Create `src/sections/Workroom.tsx`**

```tsx
import ContentSection from '../components/ContentSection'
import { useTranslation } from '../i18n/useTranslation'

function Card({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="border border-sand rounded-xl p-4 bg-white">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold text-ink text-sm">{title}</div>
      <div className="text-xs text-ink/60 mt-1">{desc}</div>
    </div>
  )
}

export default function Workroom() {
  const { lang } = useTranslation()
  if (lang === 'ar') return (
    <ContentSection id="workroom" icon="🛠" title="المجموعات وغرفة العمل">
      <p>المجموعات هي الطريقة الرئيسية للعمل التعاوني في طاقات. انضم إلى مجموعة من خلال رابط دعوة أو طلب انضمام، ثم ادخل إلى غرفة العمل.</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Card icon="📋" title="لوحة المهام" desc="تنظيم المهام في أعمدة (قيد الانتظار / جارٍ / مكتمل). كل مهمة تحتوي على وصف وأولوية وتاريخ تسليم." />
        <Card icon="⚡" title="السبرينت" desc="خطة عمل دورية للمجموعة. يُحدد السبرينت الهدف والمهام المطلوبة للفترة الزمنية." />
        <Card icon="📁" title="الملفات والتعليقات" desc="شارك الملفات مع فريقك وأضف تعليقات للنقاش." />
        <Card icon="🔗" title="المستودعات" desc="اربط مستودع GitHub بغرفة العمل لربط الكود بالمشروع." />
      </div>
    </ContentSection>
  )
  return (
    <ContentSection id="workroom" icon="🛠" title="Groups & Workroom">
      <p>Groups are the primary way to collaborate on TAQAT Academy. Join a group via an invitation link or join request, then enter the Workroom.</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Card icon="📋" title="Tasks Board" desc="Organize work in columns (Pending / In Progress / Done). Each task has a description, priority level, and due date." />
        <Card icon="⚡" title="Sprints" desc="A time-boxed work plan for your group. A sprint defines the goal and required tasks for the period." />
        <Card icon="📁" title="Files & Comments" desc="Share files with your team and add comments to discuss progress and give feedback." />
        <Card icon="🔗" title="Repositories" desc="Link a GitHub repository to the Workroom to connect your code to the project." />
      </div>
    </ContentSection>
  )
}
```

- [ ] **Step 7: Create `src/sections/Hosting.tsx` (the star section)**

This is the most important section. Content is grounded in the actual deploy agent and academy codebase.

```tsx
import ContentSection from '../components/ContentSection'
import { MockDeployLog, MockHostingTerminal } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber text-white flex items-center justify-center font-bold text-sm">{n}</div>
      <div>
        <div className="font-semibold text-ink mb-1">{title}</div>
        <div className="text-ink/70 text-sm">{children}</div>
      </div>
    </div>
  )
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-navy/10 text-navy text-xs font-mono px-2 py-0.5 rounded">{children}</span>
}

export default function Hosting() {
  const { lang } = useTranslation()
  if (lang === 'ar') return (
    <ContentSection id="hosting" icon="🚀" title="الاستضافة — من الكود إلى الإنترنت">
      <p className="text-amber font-semibold">هذا هو قلب الدليل. استضافة TAQAT تعني أن مشروعك يكون حياً على الإنترنت بعنوان مثل <code className="bg-sand px-1 rounded">https://اسمك.apps.taqat.academy</code>.</p>
      
      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الخطوة 1 — ربط مستودع GitHub</h3>
      <p>الاستضافة تعمل عبر Git push. لذا تحتاج أولاً لربط حسابك على GitHub:</p>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>انتقل إلى إعدادات مشروعك في غرفة العمل، ثم تبويب "الاستضافة".</li>
        <li>اضغط "ربط مستودع" واختر مستودعك من GitHub.</li>
        <li>سيتم إنشاء Deploy Key تلقائياً وإضافتها للمستودع — هذا مفتاح قراءة فقط يُمكّن الخادم من استنساخ الكود.</li>
      </ol>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الخطوة 2 — الكشف التلقائي عن البيئة (Stack Auto-detect)</h3>
      <p>لا تحتاج لتحديد نوع مشروعك — النظام يكتشفه تلقائياً. الأنواع المدعومة:</p>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {['Node.js / React / Next.js', 'Python / Django / Flask', 'Laravel / PHP', 'Ruby on Rails', '.NET / ASP.NET', 'Static HTML/CSS/JS'].map(s => (
          <div key={s} className="bg-navy/5 rounded-lg p-2 text-xs font-mono text-navy">{s}</div>
        ))}
      </div>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الخطوة 3 — متغيرات البيئة (.env)</h3>
      <p>أضف متغيرات البيئة يدوياً أو ارفع ملف <Badge>.env</Badge> كاملاً مباشرة من الواجهة. هذه المتغيرات تُحقن في التطبيق وقت التشغيل ولا تُحفظ في الكود.</p>
      <p className="text-amber text-sm mt-1">⚠️ لا تضع أسرارك في الكود مباشرة — دائماً عبر متغيرات البيئة.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الخطوة 4 — قواعد البيانات</h3>
      <p>يمكنك إضافة <Badge>PostgreSQL</Badge> أو <Badge>MySQL</Badge> بنقرة واحدة. متغير <Badge>DATABASE_URL</Badge> يُضاف تلقائياً إلى بيئة تطبيقك.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الخطوة 5 — النشر والسجلات</h3>
      <MockDeployLog />
      <p className="mt-3 text-sm">بعد كل push إلى الفرع الرئيسي، يبدأ البناء تلقائياً. يمكنك متابعة سجلات البناء مباشرة من الواجهة.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">الطرفية داخل المتصفح</h3>
      <p>من تبويب "Terminal" في غرفة العمل، يمكنك فتح طرفية مباشرة لتطبيقك المنشور. تدعم الطرفية إكمال الأوامر بضغط TAB.</p>
      <MockHostingTerminal lines={['$ ls', 'node_modules  package.json  src  dist', '$ npm run migrate', '> Migrations complete ✓']} />

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">SSH من جهازك</h3>
      <p>للوصول من طرفيتك المحلية:</p>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>أضف مفتاح SSH العام من إعدادات حسابك.</li>
        <li>اتصل عبر المنفذ <Badge>2222</Badge>:</li>
      </ol>
      <MockHostingTerminal lines={['$ ssh -p 2222 my-app@apps.taqat.academy', 'Connected to my-app ✓', '$ ']} />
      <p className="text-sm mt-2">مستخدمو Windows: تعليمات مخصصة متوفرة في الواجهة.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">النطاقات المخصصة</h3>
      <p>لربط نطاقك الخاص، أضف سجل CNAME يشير إلى <Badge>apps.taqat.academy</Badge> ثم أضف النطاق من الإعدادات. شهادة SSL تُولَّد تلقائياً.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">نشر رابط مشروعك في معرض المشاريع</h3>
      <p>بعد نشر تطبيقك، يمكنك إضافته إلى معرض المشاريع العام بعنوانك الخاص — هذا هو طريقك لإظهار عملك للعالم. الميزة قادمة قريباً.</p>
    </ContentSection>
  )

  return (
    <ContentSection id="hosting" icon="🚀" title="Hosting — From Code to the Internet">
      <p className="text-amber font-semibold">This is the heart of the guide. TAQAT Hosting means your project lives at a real URL like <code className="bg-sand px-1 rounded">https://your-app.apps.taqat.academy</code>.</p>
      
      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Step 1 — Connect your GitHub repository</h3>
      <p>Hosting works via Git push, so first link your GitHub account:</p>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>Go to your project settings in the Workroom, then open the "Hosting" tab.</li>
        <li>Click "Connect repository" and pick your repo from GitHub.</li>
        <li>A Deploy Key is automatically generated and added to your repository — it's a read-only key that lets the server clone your code securely.</li>
      </ol>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Step 2 — Stack Auto-detect (pick nothing)</h3>
      <p>You don't need to specify your project type — the system detects it automatically. Supported stacks:</p>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {['Node.js / React / Next.js', 'Python / Django / Flask', 'Laravel / PHP', 'Ruby on Rails', '.NET / ASP.NET', 'Static HTML/CSS/JS'].map(s => (
          <div key={s} className="bg-navy/5 rounded-lg p-2 text-xs font-mono text-navy">{s}</div>
        ))}
      </div>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Step 3 — Environment variables & .env import</h3>
      <p>Add environment variables one by one or upload your entire <Badge>.env</Badge> file directly from the interface. Variables are injected at runtime — your secrets never live in your code.</p>
      <p className="text-amber text-sm mt-1">⚠️ Never commit secrets to your repo. Always use env vars.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Step 4 — Add PostgreSQL or MySQL</h3>
      <p>Add a managed <Badge>PostgreSQL</Badge> or <Badge>MySQL</Badge> database with one click. A <Badge>DATABASE_URL</Badge> variable is automatically injected into your app's environment.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Step 5 — Deploy and view logs</h3>
      <MockDeployLog />
      <p className="mt-3 text-sm">Every push to your main branch triggers an automatic build. Watch build logs stream in real time from the interface.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">In-browser terminal (with TAB completion)</h3>
      <p>Open the "Terminal" tab in the Workroom to get a live shell into your running app. TAB completion works just like a local terminal.</p>
      <MockHostingTerminal lines={['$ ls', 'node_modules  package.json  src  dist', '$ npm run migrate', '> Migrations complete ✓']} />

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Native SSH from your laptop</h3>
      <p>To SSH in from your own machine:</p>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>Add your public SSH key in Account Settings.</li>
        <li>Connect on port <Badge>2222</Badge>:</li>
      </ol>
      <MockHostingTerminal lines={['$ ssh -p 2222 my-app@apps.taqat.academy', 'Connected to my-app ✓', '$ ']} />
      <p className="text-sm mt-2">Windows users: step-by-step Windows SSH instructions are available in the interface.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Custom domains</h3>
      <p>To connect your own domain, add a CNAME record pointing to <Badge>apps.taqat.academy</Badge>, then add the domain from your hosting settings. SSL certificates are generated automatically.</p>

      <h3 className="font-semibold text-ink text-lg mt-6 mb-3">Publishing your app URL to the Projects Gallery</h3>
      <p>Once your app is live, you can add it to the public Projects Gallery with your own title — this is how you show your work to the world. This feature is coming soon as part of an upcoming update.</p>
    </ContentSection>
  )
}
```

- [ ] **Step 8: Create `src/sections/FAQ.tsx`**

```tsx
import ContentSection from '../components/ContentSection'
import { useState } from 'react'
import { useTranslation } from '../i18n/useTranslation'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-sand rounded-xl overflow-hidden mb-2">
      <button
        className="w-full text-start px-4 py-3 font-medium text-ink flex justify-between items-center hover:bg-sand/50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <span>{q}</span>
        <span className="text-amber">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 py-3 text-sm text-ink/70 border-t border-sand bg-white">{a}</div>}
    </div>
  )
}

export default function FAQ() {
  const { lang } = useTranslation()
  if (lang === 'ar') {
    const items = [
      { q: 'فشل البناء — ماذا أفعل؟', a: 'تحقق من سجلات البناء. أكثر الأسباب شيوعاً: نسخة Node.js غير مدعومة، أو متغيرات بيئة ناقصة، أو خطأ في الـ package.json.' },
      { q: 'التطبيق لا يرد على المنفذ الصحيح', a: 'تأكد أن تطبيقك يستمع على المتغير PORT$ وليس منفذاً ثابتاً. مثال في Node.js: app.listen(process.env.PORT || 3000)' },
      { q: 'Laravel لا يعمل تلقائياً', a: 'Laravel لديه إعداد صفري تلقائي: Procfile يُنشأ تلقائياً يُشغّل php artisan migrate ثم php artisan serve. تأكد أن ملف .env يحتوي على APP_KEY.' },
      { q: 'كيف أضيف متغيرات بيئة؟', a: 'من تبويب الاستضافة في غرفة العمل، يمكنك إضافة متغيرات يدوياً أو رفع ملف .env مباشرة.' },
      { q: 'هل يمكنني استخدام قاعدة بيانات؟', a: 'نعم، PostgreSQL وMySQL متاحان بنقرة واحدة من الإعدادات. DATABASE_URL تُضاف تلقائياً.' },
      { q: 'كيف أتصل بالطرفية عبر SSH؟', a: 'أضف مفتاح SSH العام في إعدادات حسابك، ثم: ssh -p 2222 اسم-التطبيق@apps.taqat.academy' },
    ]
    return (
      <ContentSection id="faq" icon="❓" title="الأسئلة الشائعة وحل المشكلات">
        {items.map(i => <FaqItem key={i.q} q={i.q} a={i.a} />)}
      </ContentSection>
    )
  }
  const items = [
    { q: 'Build failed — what do I do?', a: 'Check the build logs. Most common causes: unsupported Node.js version, missing environment variables, or a syntax error in package.json.' },
    { q: 'App not binding to the right port', a: 'Make sure your app listens on the $PORT environment variable, not a hardcoded port. In Node.js: app.listen(process.env.PORT || 3000)' },
    { q: 'Laravel zero-config — how does it work?', a: 'Laravel gets a zero-config Procfile automatically: it runs php artisan migrate on release, then php artisan serve. Ensure your .env includes a valid APP_KEY.' },
    { q: 'How do I add environment variables?', a: 'From the Hosting tab in the Workroom, add variables individually or upload an entire .env file directly through the interface.' },
    { q: 'Can I use a database?', a: 'Yes, PostgreSQL and MySQL are available with one click from your hosting settings. DATABASE_URL is automatically injected into your environment.' },
    { q: 'How do I connect via SSH?', a: 'Add your public SSH key in Account Settings, then: ssh -p 2222 your-app-name@apps.taqat.academy' },
  ]
  return (
    <ContentSection id="faq" icon="❓" title="FAQ & Troubleshooting">
      {items.map(i => <FaqItem key={i.q} q={i.q} a={i.a} />)}
    </ContentSection>
  )
}
```

- [ ] **Step 9: Update App.tsx with all sections and hero**

```tsx
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
      </div>
      <Intro />
      <SignUp />
      <Courses />
      <Workroom />
      <Hosting />
      <FAQ />
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
```

- [ ] **Step 10: Run tests**

```bash
npm test 2>&1
```
Expected: all tests pass

- [ ] **Step 11: Build and verify no errors**

```bash
npm run build 2>&1 | tail -15
```
Expected: `dist/` created, exit 0, no TypeScript errors

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: complete App A guide content — all 5 sections"
git push gh feat/guide-and-book
```

---

## Task 4: Deploy App A to Dokku

**Files:** (no code files — deploy operations)

**Interfaces:**
- Consumes: GitHub repo `AQaddora/taqat-trainee-guide` (public — can use HTTPS URL)
- Produces: live 200 at https://academy-guide.apps.taqat.academy

- [ ] **Step 1: Create app on Dokku**

```bash
echo '{"action":"create_app","app":"academy-guide"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
```
Expected: JSON with `ok:true` and a public key in stdout (note: for public repo, deploy key is optional but generated anyway — ignore the key)

- [ ] **Step 2: Set branch**

```bash
echo '{"action":"set_repo","app":"academy-guide","branch":"main"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
```

- [ ] **Step 3: Create PR and merge App A (needed before deploy from main)**

Wait for Task 4 Step 3 (see finishing-a-development-branch skill) — after merge, deploy from main.

Actually deploy from `feat/guide-and-book` first to verify, then redeploy from main after merge.

```bash
echo '{"action":"deploy","app":"academy-guide","repo":"https://github.com/AQaddora/taqat-trainee-guide.git","branch":"feat/guide-and-book"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
```

- [ ] **Step 4: Wait for build and verify**

```bash
sleep 30
ssh taqat-apps "cat /opt/taqat/deploy-agent/logs/academy-guide.log" | tail -20
curl -s -o /dev/null -w '%{http_code}' https://academy-guide.apps.taqat.academy
```
Expected: `200`

---

## Task 5: Create App B Repo and Bootstrap

**Files:**
- New repo: `AQaddora/taqat-ai-recipes-book` (private)
- Local bootstrap at `/tmp/taqat-ai-recipes-book/`

- [ ] **Step 1: Create private GitHub repo**

```bash
gh repo create AQaddora/taqat-ai-recipes-book --private --description "AI Mastery — The Recipe Book by Ahmed Qaddoura"
```

- [ ] **Step 2: Clone and bootstrap**

```bash
cd /tmp && rm -rf taqat-ai-recipes-book && git clone git@github.com:AQaddora/taqat-ai-recipes-book.git && cd taqat-ai-recipes-book
```

- [ ] **Step 3: Create package.json, vite.config.ts, tsconfig.json, tailwind.config.ts, index.html**

Same structure as App A but with book metadata. See full content in Task 6.

- [ ] **Step 4: Commit and push**

```bash
git add -A && git commit -m "feat: bootstrap AI Mastery Recipe Book" && git push origin main
```

---

## Task 6: App B — Book Content (7 Chapters)

**Files** (all in `/tmp/taqat-ai-recipes-book/src/`):
- `chapters/ch1-foundations.tsx` through `ch7-ethics.tsx`
- `components/Layout.tsx`, `NoticeBar.tsx`, `ChapterNav.tsx`, `Sidebar.tsx`, `Header.tsx`
- `pages/Cover.tsx`, `TOC.tsx`
- `resources/PromptCheatsheet.tsx`, `SafetyGuide.tsx`
- `App.tsx`

Content sourced from `~/Work/ai-mastery-for-students/sessions/` and resources.
Excluded: PROPOSAL.md content, CV references, school-proposal fragments, TODO items, placeholders.

Each chapter follows the "recipe" format: **Goal → Core ideas → Hands-on → Key takeaways**

- [ ] **Step 1: Write ch1-foundations.tsx** (from session-1-foundations.md)
- [ ] **Step 2: Write ch2-prompting.tsx** (from session-2-prompting.md + prompt-cheatsheet.md)
- [ ] **Step 3: Write ch3-studying.tsx** (from session-3-studying-research.md)
- [ ] **Step 4: Write ch4-creativity.tsx** (from session-4-creativity.md)
- [ ] **Step 5: Write ch5-building.tsx** (from session-5-building.md + design-and-ux.md)
- [ ] **Step 6: Write ch6-productivity.tsx** (from session-6-productivity.md)
- [ ] **Step 7: Write ch7-ethics.tsx** (from session-7-capstone-ethics.md + ai-safety-guide.md)
- [ ] **Step 8: Write cover, TOC, navigation, notice bar**
- [ ] **Step 9: Build and run smoke test**

```bash
cd /tmp/taqat-ai-recipes-book && npm install && npm test && npm run build
```
Expected: all pass

- [ ] **Step 10: Commit and push**

```bash
git add -A && git commit -m "feat: complete 7-chapter AI Mastery Recipe Book" && git push origin main
```

---

## Task 7: Deploy App B to Dokku (private repo → deploy key flow)

- [ ] **Step 1: Create app and capture deploy key**

```bash
RESULT=$(echo '{"action":"create_app","app":"ai-recipes"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh)
DEPLOY_KEY=$(echo "$RESULT" | jq -r '.stdout')
echo "$DEPLOY_KEY"
```

- [ ] **Step 2: Add deploy key to private repo**

```bash
echo "$DEPLOY_KEY" | gh repo deploy-key add - --repo AQaddora/taqat-ai-recipes-book --title "taqat-apps-deploy" --read-only
```

- [ ] **Step 3: Set branch and deploy via SSH URL**

```bash
echo '{"action":"set_repo","app":"ai-recipes","branch":"main"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
echo '{"action":"deploy","app":"ai-recipes","repo":"git@github.com:AQaddora/taqat-ai-recipes-book.git","branch":"main"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
```

- [ ] **Step 4: Wait and verify**

```bash
sleep 60
ssh taqat-apps "cat /opt/taqat/deploy-agent/logs/ai-recipes.log" | tail -30
curl -s -o /dev/null -w '%{http_code}' https://ai-recipes.apps.taqat.academy
```
Expected: `200`

---

## Task 8: Verify, Self-Review, PR, Merge

- [ ] **Step 1: Verification** (superpowers:verification-before-completion)

```bash
curl -s -o /dev/null -w '%{http_code}' https://academy-guide.apps.taqat.academy
curl -s -o /dev/null -w '%{http_code}' https://ai-recipes.apps.taqat.academy
```
Both must return `200`.

- [ ] **Step 2: Content quality check for App B**

```bash
cd /tmp/taqat-ai-recipes-book
grep -ri "TODO\|placeholder\|lorem\|XXX\|PROPOSAL\|school pricing\|TBD" dist/ || echo "CLEAN"
```
Expected: CLEAN

- [ ] **Step 3: Self-review** (superpowers:requesting-code-review)

Review App A diff against spec requirements.

- [ ] **Step 4: Open PR for App A**

```bash
gh pr create --base main --head feat/guide-and-book --title "feat: TAQAT Academy trainee guide + AI Recipe Book deployment" --body "..."
```

- [ ] **Step 5: Merge PR**

```bash
gh pr merge feat/guide-and-book --squash --delete-branch
```

- [ ] **Step 6: Redeploy App A from main**

```bash
echo '{"action":"deploy","app":"academy-guide","repo":"https://github.com/AQaddora/taqat-trainee-guide.git","branch":"main"}' | ssh taqat-apps /opt/taqat/deploy-agent/agent.sh
```

- [ ] **Step 7: Final verification**

```bash
sleep 60
curl -s -o /dev/null -w '%{http_code}' https://academy-guide.apps.taqat.academy
curl -s -o /dev/null -w '%{http_code}' https://ai-recipes.apps.taqat.academy
```

- [ ] **Step 8: Write PROGRESS.md and push**

Include: both live URLs + HTTP codes, repo URLs, merge commit SHA, content summary, flags.

---

## Self-Review Checklist

**Spec coverage:**
- [x] App A: sign up, courses, workroom, hosting (deep), FAQ — all sections present
- [x] Hosting: deploy key, auto-detect (6 stacks), env vars + .env import, DB (postgres/mysql), logs, terminal (TAB), SSH (port 2222, Windows note), custom domains, gallery (described as coming soon)
- [x] en+ar bilingual with RTL
- [x] No invented features — all grounded in actual academy code/docs
- [x] App B: 7 sessions → 7 chapters, recipe format
- [x] App B: notice bar linking taqat.academy
- [x] App B: prev/next navigation, TOC, progress indicator
- [x] App B: no proposal/CV/TODO/placeholder artifacts
- [x] App A PR merged to main
- [x] App B private repo exists

**Flags:**
- FLAG: "The recipe book" interpretation — Ahmed's `ai-mastery-for-students` repo IS the book. If a different draft exists, the shell is reusable.
- FLAG: Gallery publishing described as "coming soon" per sprint spec (sibling sprint's job).
- FLAG: App B Arabic UI chrome present; full book text translation is a follow-up (machine translation not applied per spec guidance).
