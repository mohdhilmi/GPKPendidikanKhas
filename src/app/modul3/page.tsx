'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type KategoriFilter = 'Semua' | 'Kurikulum' | 'HEM' | 'Kokurikulum' | 'Pendidikan Khas'
type ViewMode = 'timeline' | 'card' | 'gallery'

const demoPrograms = [
  {
    id: '1', nama: 'Program Literasi Khas', kategori: 'Kurikulum' as const,
    tarikh_mula: '2024-02-01', tarikh_tamat: '2024-02-28', status: 'Selesai' as const,
    objektif: 'Meningkatkan kemahiran membaca murid PK', sasaran: '20 murid PK',
    post_mortem: 'Pencapaian 85% murid menunjukkan peningkatan', intervensi: 'Program bacaan berterusan',
  },
  {
    id: '2', nama: 'Kem Motivasi Murid Khas', kategori: 'HEM' as const,
    tarikh_mula: '2024-03-15', tarikh_tamat: '2024-03-16', status: 'Selesai' as const,
    objektif: 'Meningkatkan motivasi dan keyakinan diri', sasaran: '30 murid PK',
    post_mortem: 'Maklum balas positif dari murid dan ibu bapa', intervensi: 'Sesi kaunseling berkala',
  },
  {
    id: '3', nama: 'Pertandingan Sukan Khas Daerah', kategori: 'Kokurikulum' as const,
    tarikh_mula: '2024-04-10', tarikh_tamat: '2024-04-12', status: 'Selesai' as const,
    objektif: 'Penyertaan dalam sukan peringkat daerah', sasaran: '15 atlet PK',
    post_mortem: '3 pingat emas, 5 perak diperoleh', intervensi: 'Latihan berterusan',
  },
  {
    id: '4', nama: 'Bengkel IEP & RPI', kategori: 'Pendidikan Khas' as const,
    tarikh_mula: '2024-05-20', tarikh_tamat: '2024-05-20', status: 'Selesai' as const,
    objektif: 'Penyediaan IEP dan RPI yang berkesan', sasaran: 'Semua guru PK',
    post_mortem: '100% guru mengemaskini IEP', intervensi: 'Pemantauan bulanan',
  },
  {
    id: '5', nama: 'Program Transisi Murid Khas', kategori: 'Pendidikan Khas' as const,
    tarikh_mula: '2024-09-01', tarikh_tamat: '2024-10-31', status: 'Sedang Berjalan' as const,
    objektif: 'Persediaan murid Tahun 6 ke sekolah menengah', sasaran: '8 murid Tahun 6 PK',
    post_mortem: '', intervensi: '',
  },
  {
    id: '6', nama: 'Pertandingan Inovasi PK Negeri', kategori: 'Kurikulum' as const,
    tarikh_mula: '2024-11-15', tarikh_tamat: '2024-11-15', status: 'Perancangan' as const,
    objektif: 'Membentangkan inovasi PdPc PK', sasaran: '2 projek inovasi',
    post_mortem: '', intervensi: '',
  },
]

export default function Modul3Page() {
  const [kategori, setKategori] = useState<KategoriFilter>('Semua')
  const [viewMode, setViewMode] = useState<ViewMode>('card')
  const [showForm, setShowForm] = useState(false)
  const [expandedPDCA, setExpandedPDCA] = useState<string | null>(null)

  const filteredPrograms = kategori === 'Semua'
    ? demoPrograms
    : demoPrograms.filter(p => p.kategori === kategori)

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Program Pendidikan Khas</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 3 &bull; Format PDCA (Plan-Do-Check-Action)</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Program
        </button>
      </div>

      {/* Filter & View Mode */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Kategori Filter */}
        <div className="flex flex-wrap gap-2">
          {(['Semua', 'Kurikulum', 'HEM', 'Kokurikulum', 'Pendidikan Khas'] as KategoriFilter[]).map(k => (
            <button
              key={k}
              onClick={() => setKategori(k)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                kategori === k
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {[
            { key: 'card' as ViewMode, icon: '▦' },
            { key: 'timeline' as ViewMode, icon: '⏐' },
          ].map(v => (
            <button
              key={v.key}
              onClick={() => setViewMode(v.key)}
              className={`px-3 py-1.5 rounded text-xs font-medium ${
                viewMode === v.key ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'
              }`}
            >
              {v.icon} {v.key === 'card' ? 'Kad' : 'Timeline'}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tambah Program Baru</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Program</label>
              <input type="text" className="input-field" placeholder="Nama program" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
              <select className="input-field">
                <option value="Kurikulum">Kurikulum</option>
                <option value="HEM">HEM</option>
                <option value="Kokurikulum">Kokurikulum</option>
                <option value="Pendidikan Khas">Pendidikan Khas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tarikh Mula</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tarikh Tamat</label>
              <input type="date" className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Objektif</label>
              <textarea className="input-field" rows={2} placeholder="Objektif program..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sasaran</label>
              <input type="text" className="input-field" placeholder="Sasaran peserta" />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="button" className="btn-primary">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700"></div>
          {filteredPrograms.map((program) => (
            <div key={program.id} className="relative mb-6 last:mb-0">
              <div className={`absolute left-[-21px] w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 ${
                program.status === 'Selesai' ? 'bg-emerald-500' :
                program.status === 'Sedang Berjalan' ? 'bg-blue-500' : 'bg-amber-500'
              }`}></div>
              <div className="card p-4 ml-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{program.nama}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {new Date(program.tarikh_mula).toLocaleDateString('ms-MY')} - {program.tarikh_tamat ? new Date(program.tarikh_tamat).toLocaleDateString('ms-MY') : 'Tiada'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`badge ${
                      program.kategori === 'Kurikulum' ? 'badge-info' :
                      program.kategori === 'HEM' ? 'badge-warning' :
                      program.kategori === 'Kokurikulum' ? 'badge-success' : 'badge-danger'
                    }`}>{program.kategori}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{program.nama}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(program.tarikh_mula).toLocaleDateString('ms-MY')}
                    {program.tarikh_tamat && ` - ${new Date(program.tarikh_tamat).toLocaleDateString('ms-MY')}`}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  program.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                  program.status === 'Sedang Berjalan' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>{program.status}</span>
              </div>

              <div className="flex gap-2 mb-3">
                <span className={`badge ${
                  program.kategori === 'Kurikulum' ? 'badge-info' :
                  program.kategori === 'HEM' ? 'badge-warning' :
                  program.kategori === 'Kokurikulum' ? 'badge-success' : 'badge-danger'
                }`}>{program.kategori}</span>
              </div>

              {/* PDCA Toggle */}
              <button
                onClick={() => setExpandedPDCA(expandedPDCA === program.id ? null : program.id)}
                className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
              >
                <svg className={`w-3 h-3 transition-transform ${expandedPDCA === program.id ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Lihat PDCA
              </button>

              {expandedPDCA === program.id && (
                <div className="mt-3 space-y-2 animate-fadeIn">
                  {/* PLAN */}
                  <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 border-l-3 border-blue-500">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">PLAN</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{program.objektif}</p>
                    <p className="text-xs text-slate-500">Sasaran: {program.sasaran}</p>
                  </div>
                  {/* DO */}
                  <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-900/20 border-l-3 border-emerald-500">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">DO</p>
                    <p className="text-xs text-slate-500">Laporan, Gambar & Kehadiran tersedia</p>
                  </div>
                  {/* CHECK */}
                  <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/20 border-l-3 border-amber-500">
                    <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">CHECK</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{program.post_mortem || 'Belum dilengkapkan'}</p>
                  </div>
                  {/* ACTION */}
                  <div className="p-2 rounded bg-purple-50 dark:bg-purple-900/20 border-l-3 border-purple-500">
                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">ACTION</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{program.intervensi || 'Belum dilengkapkan'}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
