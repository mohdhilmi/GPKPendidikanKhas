'use client'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const currentYear = new Date().getFullYear()

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3">
        {/* Left side */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Title */}
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-slate-900 dark:text-white">MOHAMAD HILMI</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Guru Penolong Kanan Pendidikan Khas &bull; SK Senai
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Year badge */}
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-medium">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Tahun {currentYear}
          </span>

          {/* PBPPP badge */}
          <span className="inline-flex items-center gap-1.5 bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 px-3 py-1 rounded-full text-xs font-medium border border-gold-200 dark:border-gold-800">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            PBPPP
          </span>

          {/* Profile avatar */}
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">MH</span>
          </div>
        </div>
      </div>

      {/* Sub-header banner */}
      <div className="bg-gradient-to-r from-primary-500/5 to-gold-500/5 dark:from-primary-500/10 dark:to-gold-500/10 px-4 lg:px-6 py-1.5 border-t border-slate-100 dark:border-slate-700/50">
        <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 font-medium">
          &ldquo;One Stop Center Pengurusan Pendidikan Khas & Evidens PBPPP&rdquo;
        </p>
      </div>
    </header>
  )
}
