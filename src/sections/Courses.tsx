import ContentSection from '../components/ContentSection'
import { MockCourseCard } from '../components/MockUI'
import { useTranslation } from '../i18n/useTranslation'

export default function Courses() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    return (
      <ContentSection id="courses" icon="🎓" title="الدورات التدريبية">
        <p>
          الدورات في تقات مبنية حول تجربة تعلم متكاملة: فيديو → اختبار → تقدم → شهادة.
        </p>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">اكتشاف الدورات والتسجيل</h3>
        <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
          <li>من لوحة التحكم اضغط <strong>"اكتشف"</strong> للتصفح الكامل.</li>
          <li>ابحث بالاسم أو استخدم أحد الـ 8 تصنيفات لتضييق النتائج.</li>
          <li>اضغط على الدورة لرؤية المنهج الكامل (accordion) ومعلومات المدرب.</li>
          <li>اضغط <strong>"سجّل الآن"</strong> — التسجيل فوري.</li>
        </ol>

        <div className="mt-4">
          <MockCourseCard />
        </div>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">مشاهدة الفيديوهات والاختبارات</h3>
        <ul className="list-disc list-inside space-y-2 ps-2 text-sm">
          <li>
            <strong>غرفة الدورة:</strong> اذهب إلى "دوراتي" واضغط على دورتك. ستجد الجلسات القادمة،
            التسجيلات، والمنهج الكامل مع علامات الإتمام.
          </li>
          <li>
            <strong>الاختبار بعد كل فيديو:</strong> عند انتهاء كل فيديو يظهر overlay اختبار تلقائياً.
            أجب عليه قبل الانتقال للدرس التالي.
          </li>
          <li>
            <strong>"تابع التعلم":</strong> زر CTA في غرفة الدورة يأخذك مباشرة للفيديو التالي الذي لم تكمله.
          </li>
          <li>
            <strong>مؤشر التقدم:</strong> يُحسب تلقائياً من الفيديوهات المكتملة والاختبارات الناجحة.
          </li>
          <li>
            <strong>الجلسات المباشرة:</strong> تظهر في غرفة الدورة — انضم من الرابط في الوقت المحدد.
            التسجيلات تُضاف بعد انتهاء الجلسة.
          </li>
        </ul>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">الحضور والإنجازات والشهادات</h3>
        <ul className="list-disc list-inside space-y-1 ps-2 text-sm">
          <li>الحضور يُسجّل بناءً على إتمام الفيديوهات والمشاركة في الجلسات.</li>
          <li>تحصل على شارات إنجاز عند اجتياز معالم معينة — يمكن عرضها في ملفك الشخصي.</li>
          <li>عند إتمام دورة كاملة يمكنك الحصول على شهادة إتمام.</li>
        </ul>

        <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mt-2">
          <p className="text-sm text-navy font-medium">
            💡 نصيحة: راجع سجل الاختبارات في صفحة "سجل الاختبارات" لتتبع أدائك عبر الزمن.
          </p>
        </div>
      </ContentSection>
    )
  }

  return (
    <ContentSection id="courses" icon="🎓" title="Courses">
      <p>
        Courses on TAQAT Academy are built around a complete learning loop: video → quiz → progress → certificate.
      </p>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Discovering and enrolling</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>From your dashboard, click <strong>"Explore"</strong> to browse all available courses.</li>
        <li>Search by name or filter using one of 8 category chips to narrow results.</li>
        <li>Click any course to see the full curriculum (collapsible accordion) and trainer profile.</li>
        <li>Click <strong>"Enroll Now"</strong> — enrollment is instant.</li>
      </ol>

      <div className="mt-4">
        <MockCourseCard />
      </div>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Watching videos and quizzes</h3>
      <ul className="list-disc list-inside space-y-2 ps-2 text-sm">
        <li>
          <strong>Course room:</strong> Go to "My Courses" and click your course. You'll see upcoming
          sessions, recordings, and the full curriculum with completion checkmarks.
        </li>
        <li>
          <strong>Quiz after every video:</strong> When a video ends, a quiz overlay appears automatically.
          Answer it before the next lesson unlocks.
        </li>
        <li>
          <strong>"Continue Learning" button:</strong> The CTA in the course room jumps you directly to the next unwatched video.
        </li>
        <li>
          <strong>Progress indicator:</strong> Calculated automatically from completed videos and passed quizzes — shown as a percentage pill.
        </li>
        <li>
          <strong>Live sessions:</strong> Upcoming sessions appear in the course room — join from the
          provided link at session time. Recordings are added after the session ends.
        </li>
      </ul>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">Attendance, achievements & certificates</h3>
      <ul className="list-disc list-inside space-y-1 ps-2 text-sm">
        <li>Attendance is tracked from video completions and live session participation.</li>
        <li>Achievement badges are awarded at key milestones — display them on your public profile.</li>
        <li>On completing a full course, you can obtain a completion certificate.</li>
      </ul>

      <div className="bg-navy/5 border border-navy/20 rounded-xl p-4 mt-2">
        <p className="text-sm text-navy font-medium">
          💡 Tip: Check "Quiz History" in your dashboard to review your performance over time.
        </p>
      </div>
    </ContentSection>
  )
}
