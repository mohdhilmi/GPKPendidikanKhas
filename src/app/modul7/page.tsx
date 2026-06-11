'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type JenisSumbangan = 'Semua' | 'Penceramah' | 'Jurulatih Utama' | 'Jawatan Luar'

const demoSumbangan = [
  { id: '1', jenis: 'Penceramah' as const, tajuk: 'Bengkel Pengurusan IEP', tarikh: '2024-03-15', organisasi: 'PPD Kulai', catatan: 'Penceramah jemputan' },
  { id: '2', jenis: 'Penceramah' as const, tajuk: 'Seminar Pendidikan Khas Negeri Johor', tarikh: '2024-06-20', organisasi: 'JPN Johor', catatan: 'Slot 2 jam' },
  { id: '3', jenis: 'Jurulatih Utama' as const, tajuk: 'Kursus Google Workspace untuk Guru PK', tarikh: '2024-04-10', organisasi: 'PPD Kulai', catatan: '3 hari kursus' },
  { id: '4', jenis: 'Jurulatih Utama' as const, tajuk: 'Bengkel Inovasi PdPc PK', tarikh: '2024-08-05', organisasi: 'PKG Senai', catatan: 'Fasilitator' },
  { id: '5', jenis: 'Jawatan Luar' as const, tajuk: 'AJK Pendidikan Khas Daerah Kulai', tarikh: '2024-01-01', organisasi: 'PPD Kulai', catatan: 'Pengerusi' },
  { id: '6', jenis: 'Jawatan Luar' as const, tajuk: 'Ahli Persatuan Pendidikan Khas Johor', tarikh: '2024-01-01', organisasi: 'PPKJ', catatan: 'Setiausaha' },
  { id: '7', jenis: 'Jawatan Luar' as const, tajuk: 'Jurulatih Sukan Khas Daerah', tarikh: '2024-02-15', organisasi: 'MSN Johor', catatan: 'Jurulatih boccia' },
]

export default function Modul7Page() {
  const [filterJenis, setFilterJenis] = useState<JenisSumbangan>('Semua')
  const [showForm, setShowForm] = useState(false)

  const filtered = filterJenis === 'Semua' ? demoSumbangan : demoSumbangan.filter(s => s.jenis === filterJenis)

  const jenisIcons: Record<string, { icon: string; color: string }> = {
    'Penceramah': { icon: '🎤', color: 'bg-purple-100 dark:bg-purple-900/30' },
    'Jurulatih Utama': { icon: '🏋️', color: 'bg-blue-100 dark:bg-blue-900/30' },
    'Jawatan Luar': { icon: '🏛️', color: 'bg-amber-100 dark:bg-amber-900/30' },
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sumbangan Profesional & Sosial</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 7 &bull; Penceramah, Jurulatih & Jawatan Luar</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card text-center">
          <span className="text-2xl">🎤</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{demoSumbangan.filter(s => s.jenis === 'Penceramah').length}</p>
          <p className="text-xs text-slate-500">Penceramah</p>
        </div>
        <div className="stat-card text-center">
          <span className="text-2xl">🏋️</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{demoSumbangan.filter(s => s.jenis === 'Jurulatih Utama').length}</p>
          <p className="text-xs text-slate-500">Jurulatih Utama</p>
        </div>
        <div className="stat-card text-center">
          <span className="text-2xl">🏛️</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{demoSumbangan.filter(s => s.jenis === 'Jawatan Luar').length}</p>
          <p className="text-xs text-slate-500">Jawatan Luar</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(['Semua', 'Penceramah', 'Jurulatih Utama', 'Jawatan Luar'] as JenisSumbangan[]).map(j => (
          <button key={j} onClick={() => setFilterJenis(j)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterJenis === j ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            {j}
          </button>
        ))}
      </div>

      {/* Portfolio List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${jenisIcons[item.jenis].color}`}>
                {jenisIcons[item.jenis].icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{item.tajuk}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.organisasi}</p>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(item.tarikh).toLocaleDateString('ms-MY')}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`badge ${item.jenis === 'Penceramah' ? 'badge-info' : item.jenis === 'Jurulatih Utama' ? 'badge-success' : 'badge-warning'}`}>
                    {item.jenis}
                  </span>
                  <span className="text-xs text-slate-500">{item.catatan}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
