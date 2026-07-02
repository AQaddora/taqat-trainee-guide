import ContentSection from '../components/ContentSection'
import { MockDeployLog, MockHostingTerminal } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <code className="inline-block bg-ink/5 text-navy text-xs font-mono px-1.5 py-0.5 rounded border border-ink/10">
      {children}
    </code>
  )
}

function StepBlock({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 mb-5">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber text-white flex items-center justify-center font-bold text-sm shadow-sm">
        {n}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-ink mb-1.5">{title}</div>
        <div className="text-sm text-ink/70 leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

const stacks = [
  'Node.js / React / Next.js',
  'Python / Django / Flask',
  'Laravel / PHP',
  'Ruby on Rails',
  '.NET / ASP.NET',
  'Static HTML / CSS / JS',
]

export default function Hosting() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    return (
      <ContentSection id="hosting" icon="🚀" title="الاستضافة — من الكود إلى الإنترنت">
        <div className="bg-amber/10 border-s-4 border-amber rounded-e-xl p-4 mb-6">
          <p className="font-semibold text-amber text-sm">
            ⭐ هذا هو قلب الدليل. استضافة طاقات تعني أن مشروعك حي على الإنترنت بعنوان حقيقي:{' '}
            <code className="bg-white/60 px-1 rounded text-ink">https://اسمك.apps.taqat.academy</code>
          </p>
        </div>

        <StepBlock n={1} title="ربط مستودع GitHub">
          <p>الاستضافة تعمل عبر Git push. الخطوات:</p>
          <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
            <li>انتقل إلى إعدادات مشروعك في غرفة العمل → تبويب <strong>"الاستضافة"</strong>.</li>
            <li>اضغط "ربط مستودع" واختر مستودعك من GitHub.</li>
            <li>
              يُنشأ <strong>Deploy Key</strong> تلقائياً ويُضاف للمستودع — مفتاح قراءة فقط يُمكّن الخادم من
              استنساخ الكود بأمان دون الحاجة لكلمة مرورك.
            </li>
          </ol>
        </StepBlock>

        <StepBlock n={2} title="الكشف التلقائي عن البيئة — لا تختار شيئاً">
          <p>لا تحتاج لتحديد نوع مشروعك. النظام يكتشفه تلقائياً عبر nixpacks. الأنواع المدعومة:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {stacks.map(s => (
              <div key={s} className="bg-navy/5 rounded-lg p-2 text-xs font-mono text-navy border border-navy/10">
                {s}
              </div>
            ))}
          </div>
        </StepBlock>

        <StepBlock n={3} title="متغيرات البيئة — أو رفع ملف .env كاملاً">
          <p>
            أضف المتغيرات يدوياً واحداً تلو الآخر، أو ارفع ملف <Badge>.env</Badge> كاملاً مباشرة من الواجهة.
            تُحقن المتغيرات في التطبيق وقت التشغيل ولا تُخزّن في الكود أبداً.
          </p>
          <div className="bg-red/5 border border-red/20 rounded-lg p-2 mt-2 text-xs text-red/80">
            ⚠️ لا تضع أسرارك (API keys، كلمات مرور DB) في الكود مباشرة — دائماً عبر متغيرات البيئة.
          </div>
        </StepBlock>

        <StepBlock n={4} title="إضافة قاعدة بيانات PostgreSQL أو MySQL">
          <p>
            أضف قاعدة بيانات مُدارة بنقرة واحدة من إعدادات الاستضافة. متغير{' '}
            <Badge>DATABASE_URL</Badge> يُضاف تلقائياً إلى بيئة تطبيقك —
            لا تحتاج لأي إعداد إضافي.
          </p>
        </StepBlock>

        <StepBlock n={5} title="النشر ومتابعة السجلات">
          <p>كل push إلى الفرع الرئيسي يُشغّل بناءً تلقائياً:</p>
          <MockDeployLog />
          <p className="mt-2">يمكنك متابعة سجلات البناء مباشرة من الواجهة — السجلات تتدفق في الوقت الفعلي.</p>
        </StepBlock>

        <StepBlock n={6} title="الطرفية داخل المتصفح — مع إكمال TAB">
          <p>
            من تبويب "Terminal" في غرفة العمل، افتح طرفية مباشرة لتطبيقك المنشور.
            إكمال TAB يعمل تماماً كالطرفية المحلية.
          </p>
          <MockHostingTerminal
            lines={[
              '$ ls',
              'node_modules  package.json  src  dist',
              '$ npm run migrate',
              '> Running migrations...',
              '> ✓ Migrations complete',
              '$ php artisan queue:work',
            ]}
          />
        </StepBlock>

        <StepBlock n={7} title="SSH الأصلي من جهازك — المنفذ 2222">
          <p>للوصول بطرفيتك المحلية:</p>
          <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
            <li>أضف مفتاح SSH العام من إعدادات حسابك (Account Settings → SSH Keys).</li>
            <li>اتصل على المنفذ <Badge>2222</Badge>:</li>
          </ol>
          <MockHostingTerminal
            lines={[
              '$ ssh -p 2222 اسم-التطبيق@apps.taqat.academy',
              'Welcome to TAQAT Hosting',
              'Connected to: اسم-التطبيق',
              '$ ',
            ]}
          />
          <p className="mt-2">مستخدمو Windows: تعليمات SSH مخصصة لـ Windows موجودة في الواجهة مباشرة.</p>
        </StepBlock>

        <StepBlock n={8} title="النطاقات المخصصة — مع شهادة SSL تلقائية">
          <p>لربط نطاقك الخاص (مثل <Badge>myapp.com</Badge>):</p>
          <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
            <li>
              أضف سجل CNAME في DNS الخاص بك يشير إلى <Badge>apps.taqat.academy</Badge>.
            </li>
            <li>أضف النطاق من إعدادات الاستضافة.</li>
            <li>شهادة SSL (HTTPS) تُولَّد تلقائياً — لا حاجة لأي إعداد.</li>
          </ol>
        </StepBlock>

        <StepBlock n={9} title="نشر رابط تطبيقك في معرض المشاريع">
          <p>
            بعد نشر تطبيقك، ستتمكن من إضافته إلى معرض المشاريع العام بعنوانك الخاص — هذه هي الطريقة
            لإظهار عملك للعالم وجمهور الأكاديمية.
          </p>
          <div className="bg-amber/10 border border-amber/30 rounded-lg p-2 mt-2 text-xs text-amber/80">
            🚀 هذه الميزة قادمة قريباً كجزء من تحديث قريب للمنصة.
          </div>
        </StepBlock>
      </ContentSection>
    )
  }

  return (
    <ContentSection id="hosting" icon="🚀" title="Hosting — From Code to the Internet">
      <div className="bg-amber/10 border-s-4 border-amber rounded-e-xl p-4 mb-6">
        <p className="font-semibold text-amber text-sm">
          ⭐ This is the heart of the guide. TAQAT Hosting means your project is live at a real URL:{' '}
          <code className="bg-white/60 px-1 rounded text-ink">https://your-app.apps.taqat.academy</code>
        </p>
      </div>

      <StepBlock n={1} title="Connect your GitHub repository">
        <p>Hosting works via Git push. Here's how to set it up:</p>
        <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
          <li>Go to your project settings in the Workroom → open the <strong>"Hosting"</strong> tab.</li>
          <li>Click "Connect repository" and select your repo from GitHub.</li>
          <li>
            A <strong>Deploy Key</strong> is automatically generated and added to your repository — it's
            a read-only key that lets the server clone your code securely, without needing your password.
          </li>
        </ol>
      </StepBlock>

      <StepBlock n={2} title="Stack auto-detect — pick nothing">
        <p>You don't specify your project type. The system detects it automatically via nixpacks. Supported stacks:</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {stacks.map(s => (
            <div key={s} className="bg-navy/5 rounded-lg p-2 text-xs font-mono text-navy border border-navy/10">
              {s}
            </div>
          ))}
        </div>
      </StepBlock>

      <StepBlock n={3} title="Environment variables — or import your entire .env">
        <p>
          Add variables one by one, or upload an entire <Badge>.env</Badge> file directly from the
          interface. Variables are injected at runtime — your secrets never live in your source code.
        </p>
        <div className="bg-red/5 border border-red/20 rounded-lg p-2 mt-2 text-xs text-red/80">
          ⚠️ Never commit secrets (API keys, DB passwords) to your repo. Always use env vars.
        </div>
      </StepBlock>

      <StepBlock n={4} title="Add PostgreSQL or MySQL">
        <p>
          Add a managed database with one click from your hosting settings. The{' '}
          <Badge>DATABASE_URL</Badge> variable is automatically injected into your app's
          environment — no extra configuration needed.
        </p>
      </StepBlock>

      <StepBlock n={5} title="Deploy and watch logs">
        <p>Every push to your main branch triggers an automatic build:</p>
        <MockDeployLog />
        <p className="mt-2">Watch build logs stream in real time from the interface.</p>
      </StepBlock>

      <StepBlock n={6} title="In-browser terminal — with TAB completion">
        <p>
          Open the "Terminal" tab in the Workroom to get a live shell into your running app.
          TAB completion works exactly like a local terminal.
        </p>
        <MockHostingTerminal
          lines={[
            '$ ls',
            'node_modules  package.json  src  dist',
            '$ npm run migrate',
            '> Running migrations...',
            '> ✓ Migrations complete',
            '$ php artisan queue:work',
          ]}
        />
      </StepBlock>

      <StepBlock n={7} title="Native SSH from your laptop — port 2222">
        <p>To SSH in from your own machine:</p>
        <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
          <li>Add your public SSH key in Account Settings → SSH Keys.</li>
          <li>Connect on port <Badge>2222</Badge>:</li>
        </ol>
        <MockHostingTerminal
          lines={[
            '$ ssh -p 2222 my-app@apps.taqat.academy',
            'Welcome to TAQAT Hosting',
            'Connected to: my-app',
            '$ ',
          ]}
        />
        <p className="mt-2">
          <strong>Windows users:</strong> step-by-step Windows SSH instructions are available directly in the interface.
        </p>
      </StepBlock>

      <StepBlock n={8} title="Custom domains — SSL generated automatically">
        <p>To connect your own domain (e.g. <Badge>myapp.com</Badge>):</p>
        <ol className="list-decimal list-inside space-y-1.5 mt-2 ps-2">
          <li>
            Add a CNAME record in your DNS pointing to <Badge>apps.taqat.academy</Badge>.
          </li>
          <li>Add the domain from your hosting settings.</li>
          <li>An SSL certificate (HTTPS) is generated automatically — no setup needed.</li>
        </ol>
      </StepBlock>

      <StepBlock n={9} title="Publishing your app URL to the Projects Gallery">
        <p>
          Once your app is live, you'll be able to add it to the public Projects Gallery with your own
          title — this is how you showcase your work to the Academy community and beyond.
        </p>
        <div className="bg-amber/10 border border-amber/30 rounded-lg p-2 mt-2 text-xs text-amber/80">
          🚀 This feature is coming soon as part of an upcoming platform update.
        </div>
      </StepBlock>
    </ContentSection>
  )
}
