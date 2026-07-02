import type { ReactNode } from 'react'

export default function ContentSection({
  id,
  icon,
  title,
  children,
}: {
  id: string
  icon: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-sand">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-display font-bold text-ink">{title}</h2>
      </div>
      <div className="space-y-4 text-ink/80 leading-relaxed">{children}</div>
    </section>
  )
}
