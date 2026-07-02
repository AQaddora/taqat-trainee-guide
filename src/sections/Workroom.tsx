import ContentSection from '../components/ContentSection'
import { useTranslation } from '../i18n/useTranslation'

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="border border-sand rounded-xl p-4 bg-white hover:border-amber/40 transition-colors">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold text-ink text-sm mb-1">{title}</div>
      <div className="text-xs text-ink/60 leading-relaxed">{desc}</div>
    </div>
  )
}

export default function Workroom() {
  const { lang } = useTranslation()

  if (lang === 'ar') {
    return (
      <ContentSection id="workroom" icon="🛠️" title="المجموعات وغرفة العمل">
        <p>
          المجموعات هي آلية العمل الجماعي في تقات. انضم إلى مجموعة عبر رابط دعوة أو اطلب الانضمام،
          ثم ادخل <strong>غرفة العمل</strong> — مساحة المشروع المشتركة.
        </p>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-3">ميزات غرفة العمل</h3>
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard
            icon="📋"
            title="لوحة المهام"
            desc="نظّم العمل في أعمدة: قيد الانتظار / قيد التنفيذ / مكتمل. كل مهمة لها وصف، أولوية، وتاريخ تسليم."
          />
          <FeatureCard
            icon="⚡"
            title="السبرينت"
            desc="خطة عمل دورية زمنية. تحدد الهدف والمهام للفترة. تُساعد الفريق على البقاء متزامناً وركّزاً."
          />
          <FeatureCard
            icon="📁"
            title="الملفات والتعليقات"
            desc="شارك ملفات المشروع مع فريقك وأضف تعليقات لمناقشة التقدم وتقديم الملاحظات."
          />
          <FeatureCard
            icon="🔗"
            title="المستودعات"
            desc="اربط مستودع GitHub بغرفة العمل لربط كودك بالمشروع. هذا أساسي لاستخدام ميزة الاستضافة."
          />
        </div>

        <h3 className="font-semibold text-ink text-lg mt-5 mb-2">كيفية الانضمام إلى مجموعة</h3>
        <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
          <li>احصل على رابط الدعوة من مشرف المجموعة، أو ابحث عن المجموعة وأرسل طلب انضمام.</li>
          <li>بعد القبول، ستجد المجموعة في قائمة "مجموعاتي" في لوحة التحكم.</li>
          <li>اضغط على المجموعة للوصول إلى غرفة العمل.</li>
        </ol>

        <div className="bg-mint/10 border border-mint/30 rounded-xl p-4 mt-2">
          <p className="text-sm text-mint font-medium">
            🛠️ نصيحة المدرب: المدرب يمكنه تتبع تقدم الطلاب، مراجعة المهام، وإضافة تسجيلات الجلسات مباشرة من واجهة المدرب.
          </p>
        </div>
      </ContentSection>
    )
  }

  return (
    <ContentSection id="workroom" icon="🛠️" title="Groups & Workroom">
      <p>
        Groups are TAQAT Academy's collaborative layer. Join a group via an invitation link or send
        a join request — then enter the <strong>Workroom</strong>, your shared project space.
      </p>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-3">Workroom features</h3>
      <div className="grid grid-cols-2 gap-3">
        <FeatureCard
          icon="📋"
          title="Tasks Board"
          desc="Organize work in columns: Pending / In Progress / Done. Each task has a description, priority level, and due date."
        />
        <FeatureCard
          icon="⚡"
          title="Sprints"
          desc="A time-boxed work plan for the group. Defines the goal and tasks for the period — keeps the team aligned and focused."
        />
        <FeatureCard
          icon="📁"
          title="Files & Comments"
          desc="Share project files with your team and add comments to discuss progress and give feedback."
        />
        <FeatureCard
          icon="🔗"
          title="Repositories"
          desc="Link a GitHub repository to the Workroom. This connection is the foundation of the Hosting feature."
        />
      </div>

      <h3 className="font-semibold text-ink text-lg mt-5 mb-2">How to join a group</h3>
      <ol className="list-decimal list-inside space-y-2 ps-2 text-sm">
        <li>Get an invitation link from the group admin, or find the group and send a join request.</li>
        <li>Once accepted, the group appears in "My Groups" on your dashboard.</li>
        <li>Click the group to enter the Workroom.</li>
      </ol>

      <div className="bg-mint/10 border border-mint/30 rounded-xl p-4 mt-2">
        <p className="text-sm text-mint font-medium">
          🛠️ Trainer tip: Trainers can track student progress, review task submissions, and add session recordings directly from the trainer interface.
        </p>
      </div>
    </ContentSection>
  )
}
