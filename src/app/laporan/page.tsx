'use client'

import DashboardLayout from '@/components/DashboardLayout'

const reports = [
  { id: '1', title: 'Laporan PBPPP Tahunan', desc: 'Laporan lengkap pencapaian PBPPP untuk tahun semasa', icon: '📊', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { id: '2', title: 'Laporan Program', desc: 'Senarai semua program PDCA yang dilaksanakan', icon: '📋', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: '3', title: 'Laporan Kewangan', desc: 'Ringkasan peruntukan dan perbelanjaan', icon: '💰', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { id: '4', title: 'Portfolio GPK Pendidikan Khas', desc: 'Portfolio profesional lengkap', icon: '📁', color: 'bg-gold-100 dark:bg-gold-900/30' },
  { id: '5', title: 'Fail Meja Digital', desc: 'Fail meja dan senarai tugas GPKPK', icon: '🗂️', color: 'bg-indigo-100 dark:bg-indigo-900/30' },
]

export default function LaporanPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Laporan Automatik</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Jana laporan PDF automatik daripada data sistem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="card p-6 hover:shadow-lg transition-shadow group">
            <div className={`w-14 h-14 ${report.color} rounded-xl flex items-center justify-center mb-4 text-2xl`}>
              {report.icon}
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{report.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{report.desc}</p>
            <button className="w-full btn-primary text-sm flex items-center justify-center gap-2 group-hover:shadow-md transition-shadow">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Jana PDF
            </button>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="card p-5 mt-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-300">Nota</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Laporan dijana secara automatik berdasarkan data yang telah dimasukkan. Pastikan semua modul dikemaskini untuk laporan yang lengkap.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
