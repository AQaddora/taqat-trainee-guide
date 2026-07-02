import ContentSection from '../components/ContentSection'
import { MockLoginForm } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

export default function SignUp() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    return (
      <ContentSection id="signup" icon="🔐" title="التسجيل وتسجيل الدخول">
        <p>
          نظام المصادقة في أكاديمية طاقات موحد — SSO واحد يعمل في جميع خدمات طاقات. سواء كنت طالباً
          أو مدرباً، البوابة واحدة.
        </p>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">إنشاء حساب جديد</h3>
        <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
          <li>افتح <strong>taqat.academy</strong> واضغط "تسجيل".</li>
          <li>أدخل اسمك الكامل، بريدك الإلكتروني، وكلمة مرور قوية.</li>
          <li>اختر نوع الحساب: <strong>طالب</strong> أو <strong>مدرب</strong>. الطلاب الجدد يبدأون هنا دائماً.</li>
          <li>
            كطالب، يمكنك إضافة معلومات اختيارية إضافية: رقم واتساب، موقع إلكتروني شخصي، LinkedIn،
            GitHub، Twitter/X، Instagram.
          </li>
          <li>أكمل التحقق من البريد الإلكتروني — ستصلك رسالة برمز مكون من 6 أرقام. أدخله أو اضغط "تخطي الآن" لتأجيله.</li>
        </ol>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">تسجيل الدخول</h3>
        <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
          <li>اضغط "دخول" في أعلى أي صفحة.</li>
          <li>أدخل بريدك وكلمة مرورك — أو استمر بحسابك على Google (يظهر نموذج اختيار Google).</li>
          <li>تُحوَّل فوراً إلى لوحة التحكم الخاصة بك.</li>
        </ol>

        <div className="mt-4">
          <MockLoginForm />
        </div>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">ملفك الشخصي</h3>
        <p className="text-sm">
          اضغط على صورتك في الزاوية للوصول إلى صفحة الملف الشخصي. يمكنك:
        </p>
        <ul className="list-disc list-inside space-y-1 ps-2 text-sm mt-2">
          <li>رفع صورة ملف وصورة غلاف</li>
          <li>كتابة نبذة شخصية وإضافة مهاراتك</li>
          <li>عرض مشاريع Portfolio — كل مشروع له عنوان، وصف، ورابط</li>
        </ul>
        <p className="text-sm text-ink/60 mt-2">ملفك الشخصي هو وجهك في الأكاديمية — استثمر فيه من البداية.</p>
      </ContentSection>
    )
  }

  return (
    <ContentSection id="signup" icon="🔐" title="Sign Up & Sign In">
      <p>
        Authentication on TAQAT Academy is unified — one SSO system across all TAQAT services.
        Whether you're a student or a trainer, there's a single sign-in gateway.
      </p>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Creating a new account</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>Open <strong>taqat.academy</strong> and click "Sign Up".</li>
        <li>Enter your full name, email address, and a strong password.</li>
        <li>Choose your account type: <strong>Student</strong> or <strong>Trainer</strong>. New learners always start as Student.</li>
        <li>
          As a student, you can optionally add: WhatsApp number, personal website, LinkedIn,
          GitHub, Twitter/X, and Instagram — all optional, all shown on your public profile.
        </li>
        <li>Complete email verification — you'll get a 6-digit code by email. Enter it on the verification page, or click "Skip for now" to do it later.</li>
      </ol>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Signing in</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>Click "Sign In" at the top of any page.</li>
        <li>Enter your email and password — or use Google (a picker modal appears).</li>
        <li>You're taken directly to your dashboard.</li>
      </ol>

      <div className="mt-4">
        <MockLoginForm />
      </div>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Your profile</h3>
      <p className="text-sm">
        Click your avatar in the corner to open your profile page. You can:
      </p>
      <ul className="list-disc list-inside space-y-1 ps-2 text-sm mt-2">
        <li>Upload a profile picture and cover image</li>
        <li>Write a personal bio and add your skills list</li>
        <li>Add portfolio projects — each with a title, description, and link</li>
      </ul>
      <p className="text-sm text-ink/60 mt-2">Your profile is your public face on the platform — invest in it from day one.</p>
    </ContentSection>
  )
}
