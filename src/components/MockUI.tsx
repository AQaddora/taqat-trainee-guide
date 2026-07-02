export function MockLoginForm() {
  return (
    <div className="border border-sand rounded-xl p-5 bg-white max-w-sm shadow-sm my-4">
      <div className="font-semibold text-ink mb-4 text-sm">تسجيل الدخول / Sign In</div>
      <div className="space-y-2.5">
        <div className="h-10 bg-paper-2 rounded-lg px-3 flex items-center text-sm text-ink/40 border border-sand">
          البريد الإلكتروني / Email
        </div>
        <div className="h-10 bg-paper-2 rounded-lg px-3 flex items-center text-sm text-ink/40 border border-sand">
          كلمة المرور / Password
        </div>
        <div className="h-11 bg-amber rounded-lg flex items-center justify-center text-sm font-semibold text-white shadow-sm">
          دخول / Sign In
        </div>
        <div className="text-center">
          <span className="text-xs text-ink/40">— or —</span>
        </div>
        <div className="h-10 bg-white border border-sand rounded-lg flex items-center justify-center gap-2 text-sm text-ink/60">
          <span>G</span> Continue with Google
        </div>
      </div>
    </div>
  )
}

export function MockCourseCard() {
  return (
    <div className="border border-sand rounded-xl p-4 bg-white max-w-xs shadow-sm my-4">
      <div className="h-32 rounded-lg bg-gradient-to-br from-amber/20 to-navy/10 mb-3 flex items-center justify-center text-5xl">
        🐍
      </div>
      <div className="font-semibold text-ink text-sm mb-1">Python for Beginners</div>
      <div className="text-xs text-ink/50">Ahmed Al-Rashid · 12 videos</div>
      <div className="mt-2 flex items-center gap-1">
        <div className="flex-1 h-1.5 bg-sand rounded-full overflow-hidden">
          <div className="h-full w-3/5 bg-amber rounded-full" />
        </div>
        <span className="text-xs text-ink/40">60%</span>
      </div>
      <div className="mt-3 h-9 bg-amber rounded-lg flex items-center justify-center text-xs font-semibold text-white">
        Continue Learning →
      </div>
    </div>
  )
}

export function MockHostingTerminal({ lines }: { lines: string[] }) {
  return (
    <div className="bg-ink rounded-xl p-4 font-mono text-sm overflow-x-auto my-4 shadow-lg">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-mint/60" />
      </div>
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.startsWith('$')
              ? 'text-amber'
              : line.startsWith('remote:') || line.startsWith('>')
                ? 'text-mint'
                : 'text-white/70'
          }
        >
          {line}
        </div>
      ))}
    </div>
  )
}

export function MockDeployLog() {
  return (
    <MockHostingTerminal
      lines={[
        '$ git push origin main',
        'Enumerating objects: 8, done.',
        'remote: Building with nixpacks...',
        'remote: ✓ Detected Node.js 20',
        'remote: ✓ Installing dependencies (npm ci)',
        'remote: ✓ npm run build',
        'remote: ✓ Build complete in 42s',
        'remote: ✓ Deploy complete!',
        'remote: 🌍 https://my-app.apps.taqat.academy',
      ]}
    />
  )
}
