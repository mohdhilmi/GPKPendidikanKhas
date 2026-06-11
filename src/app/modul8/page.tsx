'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type Peringkat = 'Semua' | 'Daerah' | 'Negeri' | 'Kebangsaan' | 'Antarabangsa'

const demoPencapaian = [
  { id: '1', nama: 'Johan Inovasi PdPc PK Daerah Kulai', tahun: 2024, peringkat: 'Daerah' as const, catatan: 'Projek ABM Sensori Digital' },
  { id: '2', nama: 'Anugerah Guru Inovatif PPD Kulai', tahun: 2024, peringkat: 'Daerah' as const, catatan: 'Pengiktirafan tahunan' },
  { id: '3', nama: 'Naib Johan Pertandingan Website Sekolah', tahun: 2023, peringkat: 'Negeri' as const, catatan: 'Kategori Pendidikan Khas' },
  { id: '4', nama: 'Peserta Konvensyen Inovasi PK Kebangsaan', tahun: 2023, peringkat: 'Kebangsaan' as const, catatan: 'Pingat Perak' },
  { id: '5', nama: 'Top 10 Anugerah ICT dalam PdPc', tahun: 2024, peringkat: 'Negeri' as const, catatan: 'JPN Johor' },
  { id: '6', nama: 'Pingat Emas Sukan Khas Boccia', tahun: 2024, peringkat: 'Daerah' as const, catatan: 'Sebagai jurulatih' },
  { id: '7', nama: 'Best Paper Seminar Pendidikan Khas Antarabangsa', tahun: 2023, peringkat: 'Antarabangsa' as const, catatan: 'Universiti Kebangsaan Malaysia' },
]

const peringkatColors: Record<string, string> = {
  'Daerah': 'bg-blue-500',
  'Negeri': 'bg-emerald-500',
  'Kebangsaan': 'bg-purple-500',
  'Antarabangsa': 'bg-gold-500',
}

export default function Modul8Page() {
  const [filterPeringkat, setFilterPeringkat] = useState<Peringkat>('Semua')
  const [showForm, setShowForm] = useState(false)

  const filtered = filterPeringkat === 'Semua' ? demoPencapaian : demoPencapaian.filter(p => p.peringkat === filterPeringkat)

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pencapaian</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 8 &bull; Timeline Achievement</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Pencapaian
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['Daerah', 'Negeri', 'Kebangsaan', 'Antarabangsa'] as const).map(p => (
          <div key={p} className="stat-card text-center cursor-pointer hover:shadow-md" onClick={() => setFilterPeringkat(p === filterPeringkat ? 'Semua' : p)}>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{demoPencapaian.filter(x => x.peringkat === p).length}</p>
            <p className="text-xs text-slate-500">{p}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['Semua', 'Daerah', 'Negeri', 'Kebangsaan', 'Antarabangsa'] as Peringkat[]).map(p => (
          <button key={p} onClick={() => setFilterPeringkat(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterPeringkat === p ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-gold-500 to-emerald-500"></div>
        {filtered.map((item, idx) => (
          <div key={item.id} className="relative mb-6 last:mb-0 animate-fadeIn" style={{ animationDelay: `${idx * 50}ms` }}>
            <div className={`absolute left-[-21px] w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${peringkatColors[item.peringkat]}`}></div>
            <div className="card p-5 ml-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.nama}</h4>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.catatan}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`badge ${
                    item.peringkat === 'Antarabangsa' ? 'bg-gold-100 text-gold-700 dark:bg-gold-900/30 dark:text-gold-400' :
                    item.peringkat === 'Kebangsaan' ? 'badge-info' :
                    item.peringkat === 'Negeri' ? 'badge-success' : 'badge-warning'
                  }`}>{item.peringkat}</span>
                  <p className="text-xs text-slate-400 mt-1">{item.tahun}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
