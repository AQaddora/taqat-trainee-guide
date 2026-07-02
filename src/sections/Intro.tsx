import ContentSection from '../components/ContentSection'
import { useTranslation } from '../i18n/useTranslation'

export default function Intro() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    return (
      <ContentSection id="intro" icon="📖" title="مرحباً في أكاديمية طاقات">
        <p>
          أكاديمية طاقات هي منصة تعليمية إلكترونية مجانية مصممة لخدمة المتعلمين في فلسطين ومنطقة الشرق
          الأوسط وشمال أفريقيا. ستجد فيها دورات تدريبية مصورة، جلسات مباشرة مع المدربين، اختبارات
          بعد كل فيديو، شارات إنجاز، ومنصة استضافة متكاملة تُمكّنك من نشر مشروعك البرمجي للعالم.
        </p>
        <p className="font-semibold text-ink">ما الذي ستتعلمه من هذا الدليل؟</p>
        <ul className="list-disc list-inside space-y-2 ps-2">
          <li>كيفية إنشاء حساب وتسجيل الدخول عبر نظام SSO الموحد</li>
          <li>التسجيل في الدورات ومشاهدة الفيديوهات والحصول على الشهادات</li>
          <li>الانضمام إلى مجموعة والعمل التعاوني في غرفة العمل</li>
          <li>
            <span className="text-amber font-semibold">استضافة مشروعك ونشره — بالتفصيل الكامل:</span>{' '}
            ربط GitHub، الكشف التلقائي عن البيئة، متغيرات البيئة، قواعد البيانات، الطرفية المدمجة، SSH، النطاقات المخصصة
          </li>
          <li>الأسئلة الشائعة وحل مشكلات النشر</li>
        </ul>
        <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mt-2">
          <p className="text-sm font-medium text-amber">
            📌 ملاحظة: هذا الدليل مبني على المنتج الحقيقي — كل خطوة موثقة من كود المنصة الفعلي.
          </p>
        </div>
      </ContentSection>
    )
  }

  return (
    <ContentSection id="intro" icon="📖" title="Welcome to TAQAT Academy">
      <p>
        TAQAT Academy is a free online learning platform built for learners in Palestine and the
        wider MENA region. You'll find video courses, live trainer sessions, quizzes after every
        video, achievement badges, and a fully integrated hosting platform that lets you deploy
        your project to the internet.
      </p>
      <p className="font-semibold text-ink">What you'll learn in this guide:</p>
      <ul className="list-disc list-inside space-y-2 ps-2">
        <li>How to sign up and sign in using TAQAT's unified SSO</li>
        <li>Enrolling in courses, watching videos, and earning certificates</li>
        <li>Joining a group and collaborating in the Workroom</li>
        <li>
          <span className="text-amber font-semibold">Hosting your project — in depth:</span>{' '}
          connecting GitHub, stack auto-detect, env vars, databases, the in-browser terminal, SSH, and custom domains
        </li>
        <li>FAQ and troubleshooting common deploy issues</li>
      </ul>
      <div className="bg-amber/10 border border-amber/30 rounded-xl p-4 mt-2">
        <p className="text-sm font-medium text-amber">
          📌 Everything in this guide is grounded in the real product — every step reflects how the
          platform actually works.
        </p>
      </div>
    </ContentSection>
  )
}
