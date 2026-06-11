'use client'

import DashboardLayout from '@/components/DashboardLayout'

const modulStats = [
  { name: 'Perancangan & Pembangunan Pelajaran', count: 12, color: 'bg-blue-500', progress: 85 },
  { name: 'Penyeliaan & Pemantauan', count: 4, color: 'bg-emerald-500', progress: 100 },
  { name: 'Program Pendidikan Khas', count: 8, color: 'bg-purple-500', progress: 75 },
  { name: 'Pengurusan Kewangan', count: 15, color: 'bg-amber-500', progress: 90 },
  { name: 'Jalinan & Jaringan', count: 6, color: 'bg-teal-500', progress: 60 },
  { name: 'ICT & Digitalisasi', count: 10, color: 'bg-indigo-500', progress: 80 },
  { name: 'Sumbangan Profesional', count: 7, color: 'bg-pink-500', progress: 70 },
  { name: 'Pencapaian', count: 5, color: 'bg-orange-500', progress: 65 },
  { name: 'Amalan Terbaik & Inovasi', count: 3, color: 'bg-cyan-500', progress: 50 },
]

export default function DashboardPage() {
  const currentYear = new Date().getFullYear()
  const totalProgress = Math.round(modulStats.reduce((a, b) => a + b.progress, 0) / modulStats.length)

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="card p-6 mb-6 bg-gradient-to-r from-primary-500 to-primary-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Selamat Datang, Mohamad Hilmi!</h2>
            <p className="text-primary-100 mt-1">Guru Penolong Kanan Pendidikan Khas, SK Senai</p>
            <p className="text-primary-200 text-sm mt-2">
              Tahun {currentYear} &bull; Sesi Persekolahan Semasa
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="35" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                  <circle cx="40" cy="40" r="35" stroke="#fbbf24" strokeWidth="6" fill="none" 
                    strokeDasharray={`${(totalProgress / 100) * 220} 220`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{totalProgress}%</span>
                </div>
              </div>
              <p className="text-xs text-primary-200 mt-1">PBPPP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">47</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Dokumen</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">8</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Program</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold-100 dark:bg-gold-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gold-600 dark:text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">5</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pencapaian</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Inovasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* PBPPP Modules Progress */}
      <div className="card p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Status PBPPP {currentYear}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modulStats.map((modul, index) => (
            <div key={index} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate pr-2">
                  {index + 1}. {modul.name}
                </h4>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{modul.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${modul.color} transition-all duration-500`}
                  style={{ width: `${modul.progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">{modul.count} evidens</span>
                {modul.progress === 100 ? (
                  <span className="badge-success text-[10px]">Lengkap</span>
                ) : modul.progress >= 75 ? (
                  <span className="badge-info text-[10px]">Hampir Siap</span>
                ) : (
                  <span className="badge-warning text-[10px]">Dalam Proses</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Aktiviti Terkini
          </h3>
          <div className="space-y-3">
            {[
              { text: 'e-RPH Januari dimuat naik', time: '2 jam lalu', type: 'upload' },
              { text: 'Program Khas Diwali ditambah', time: '1 hari lalu', type: 'program' },
              { text: 'Sijil Pencapaian Daerah dikemaskini', time: '2 hari lalu', type: 'achievement' },
              { text: 'Laporan Kewangan Q4 dijana', time: '3 hari lalu', type: 'report' },
              { text: 'Projek ICT baru didaftarkan', time: '1 minggu lalu', type: 'ict' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'upload' ? 'bg-blue-500' :
                  activity.type === 'program' ? 'bg-purple-500' :
                  activity.type === 'achievement' ? 'bg-gold-500' :
                  activity.type === 'report' ? 'bg-emerald-500' :
                  'bg-indigo-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{activity.text}</p>
                  <p className="text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Tindakan Pantas
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Upload e-RPH', icon: '📄', href: '/modul1' },
              { label: 'Tambah Program', icon: '📋', href: '/modul3' },
              { label: 'Rekod Kewangan', icon: '💰', href: '/modul4' },
              { label: 'Upload Sijil', icon: '🏆', href: '/modul8' },
              { label: 'Jana Laporan', icon: '📊', href: '/laporan' },
              { label: 'Carian Global', icon: '🔍', href: '/carian' },
            ].map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:shadow-sm transition-all duration-200 group"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {action.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
