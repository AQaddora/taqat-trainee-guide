import { useState } from 'react'
import ContentSection from '../components/ContentSection'
import { useTranslation } from '../i18n/useTranslation'

function FaqItem({ q, a }: { q: string; a: string | React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-sand rounded-xl overflow-hidden mb-2 bg-white">
      <button
        className="w-full text-start px-4 py-3.5 font-medium text-ink text-sm flex justify-between items-center hover:bg-sand/50 transition-colors"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className={`text-amber font-bold text-lg transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 text-sm text-ink/70 border-t border-sand/50 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    const items = [
      {
        q: 'فشل البناء (Build failed) — ماذا أفعل؟',
        a: 'افتح سجلات البناء من واجهة الاستضافة. أكثر الأسباب شيوعاً: (1) نسخة Node.js غير متوافقة — أضف "engines": {"node": ">=20"} في package.json؛ (2) متغيرات بيئة ناقصة — أضفها في إعدادات الاستضافة؛ (3) خطأ نحوي في package.json أو بيئة البناء.',
      },
      {
        q: 'التطبيق يعمل محلياً لكنه لا يرد عبر الإنترنت',
        a: 'السبب الأكثر شيوعاً: التطبيق يستمع على منفذ ثابت بدلاً من $PORT. تأكد أن كودك يستخدم المتغير: const port = process.env.PORT || 3000؛ ثم app.listen(port). الخادم يحول الطلبات إلى $PORT فقط.',
      },
      {
        q: 'Laravel لا يعمل — ماذا أحتاج؟',
        a: 'Laravel لديه إعداد صفري تلقائي: Procfile يُنشأ تلقائياً يُشغّل php artisan migrate --force عند النشر ثم php artisan serve --host=0.0.0.0 --port=$PORT. تأكد أن ملف .env يحتوي على APP_KEY صالح وأن متغير APP_ENV مضبوط على production.',
      },
      {
        q: 'كيف أضيف متغيرات البيئة؟',
        a: 'من تبويب "الاستضافة" في غرفة العمل، يمكنك: (1) إضافة متغيرات يدوياً واحداً تلو الآخر؛ (2) رفع ملف .env كاملاً — يُقرأ ويُضاف تلقائياً. التطبيق يحتاج لإعادة نشر لتفعيل المتغيرات الجديدة.',
      },
      {
        q: 'كيف أستخدم قاعدة البيانات؟',
        a: 'من إعدادات الاستضافة، اضغط "إضافة قاعدة بيانات" واختر PostgreSQL أو MySQL. سيُضاف DATABASE_URL تلقائياً لمتغيرات تطبيقك. في Laravel يتم استخدامه تلقائياً. في Node.js استخدمه: process.env.DATABASE_URL.',
      },
      {
        q: 'كيف أتصل بطرفيتي المحلية عبر SSH؟',
        a: 'أضف مفتاح SSH العام من إعدادات حسابك. ثم: ssh -p 2222 اسم-التطبيق@apps.taqat.academy — المنفذ هو 2222 دائماً. مستخدمو Windows: تعليمات مفصلة متوفرة في الواجهة.',
      },
      {
        q: 'تطبيقي يبدأ ثم يتوقف تلقائياً',
        a: 'تحقق من سجلات التطبيق (Application logs) في الواجهة. الأسباب الشائعة: استثناء غير معالج عند بدء التشغيل، محاولة استخدام منفذ محجوز، أو ذاكرة غير كافية. للتشخيص: افتح الطرفية داخل المتصفح وشغّل التطبيق يدوياً لرؤية الخطأ كاملاً.',
      },
    ]
    return (
      <ContentSection id="faq" icon="❓" title="الأسئلة الشائعة وحل المشكلات">
        {items.map(i => (
          <FaqItem key={i.q} q={i.q} a={i.a} />
        ))}
        <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mt-4">
          <p className="text-sm text-navy">
            💬 لا تجد جوابك هنا؟ تواصل مع المجتمع في مجموعتك أو مع فريق طاقات مباشرة من خلال المنصة.
          </p>
        </div>
      </ContentSection>
    )
  }

  const items = [
    {
      q: 'Build failed — what do I do?',
      a: 'Open the build logs from the hosting interface. Most common causes: (1) Unsupported Node.js version — add "engines": {"node": ">=20"} to package.json; (2) Missing environment variables — add them in hosting settings; (3) Syntax error in package.json or build scripts.',
    },
    {
      q: 'App works locally but doesn\'t respond online',
      a: 'Most common cause: the app listens on a hardcoded port instead of $PORT. Make sure your code uses the environment variable: const port = process.env.PORT || 3000; then app.listen(port). The server only routes requests to $PORT.',
    },
    {
      q: 'Laravel zero-config — how does it work?',
      a: 'Laravel gets a zero-config Procfile automatically: it runs php artisan migrate --force on release and then php artisan serve --host=0.0.0.0 --port=$PORT. Ensure your .env contains a valid APP_KEY and APP_ENV=production.',
    },
    {
      q: 'How do I add environment variables?',
      a: 'From the "Hosting" tab in the Workroom, you can: (1) add variables one by one; (2) upload an entire .env file — it\'s parsed and added automatically. The app needs to be redeployed to pick up new variables.',
    },
    {
      q: 'How do I use a database?',
      a: 'From hosting settings, click "Add database" and choose PostgreSQL or MySQL. DATABASE_URL is automatically added to your app\'s environment. In Laravel it\'s picked up automatically. In Node.js, use: process.env.DATABASE_URL.',
    },
    {
      q: 'How do I connect via SSH from my laptop?',
      a: 'Add your public SSH key in Account Settings. Then: ssh -p 2222 my-app-name@apps.taqat.academy — port 2222 always. Windows users: detailed Windows SSH instructions are available in the interface.',
    },
    {
      q: 'My app starts then crashes immediately',
      a: 'Check the application logs in the interface. Common causes: an unhandled exception at startup, trying to bind a reserved port, or out-of-memory. To diagnose: open the in-browser terminal and run the app manually to see the full error.',
    },
  ]

  return (
    <ContentSection id="faq" icon="❓" title="FAQ & Troubleshooting">
      {items.map(i => (
        <FaqItem key={i.q} q={i.q} a={i.a} />
      ))}
      <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mt-4">
        <p className="text-sm text-navy">
          💬 Can't find your answer? Reach out to your group community or contact the TAQAT team directly through the platform.
        </p>
      </div>
    </ContentSection>
  )
}
