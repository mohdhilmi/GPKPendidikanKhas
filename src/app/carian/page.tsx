'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const allItems = [
  { type: 'Dokumen', title: 'RPH_Januari_2024.pdf', desc: 'Folder: PBPPP', modul: 'Modul 1' },
  { type: 'Program', title: 'Program Literasi Khas', desc: 'Kurikulum - Selesai', modul: 'Modul 3' },
  { type: 'Program', title: 'Kem Motivasi Murid Khas', desc: 'HEM - Selesai', modul: 'Modul 3' },
  { type: 'Sijil', title: 'Johan Inovasi PdPc PK Daerah Kulai', desc: 'Peringkat Daerah 2024', modul: 'Modul 8' },
  { type: 'Inovasi', title: 'ABM Sensori Digital Interactive', desc: 'Bahan Bantu Mengajar 2024', modul: 'Modul 9' },
  { type: 'Pencapaian', title: 'Naib Johan Website Sekolah Negeri', desc: 'Peringkat Negeri 2023', modul: 'Modul 8' },
  { type: 'Dokumen', title: 'Kertas_Kerja_Program_Literasi.docx', desc: 'Folder: PROGRAM', modul: 'Modul 3' },
  { type: 'Kewangan', title: 'PCG Pendidikan Khas - RM5,000', desc: 'Peruntukan Jan 2024', modul: 'Modul 4' },
  { type: 'ICT', title: 'Chatbot AI Pendidikan Khas', desc: 'Projek ICT 2024', modul: 'Modul 6' },
  { type: 'Sumbangan', title: 'Bengkel Pengurusan IEP', desc: 'Penceramah - PPD Kulai', modul: 'Modul 7' },
]

const typeIcons: Record<string, string> = {
  'Dokumen': '📄',
  'Program': '📋',
  'Sijil': '🏅',
  'Inovasi': '💡',
  'Pencapaian': '🏆',
  'Kewangan': '💰',
  'ICT': '💻',
  'Sumbangan': '🎤',
}

export default function CarianPage() {
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('Semua')

  const results = allItems.filter(item => {
    const matchQuery = !query || 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
    const matchType = filterType === 'Semua' || item.type === filterType
    return matchQuery && matchType
  })

  const types = ['Semua', ...Array.from(new Set(allItems.map(i => i.type)))]

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Carian Global</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cari semua dokumen, program, sijil, inovasi & pencapaian</p>
      </div>

      {/* Search Box */}
      <div className="card p-6 mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            placeholder="Taipkan untuk mencari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {types.map(t => (
            <button key={t} onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === t ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {t !== 'Semua' && <span className="mr-1">{typeIcons[t]}</span>}
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        <p className="text-sm text-slate-500 mb-2">{results.length} keputusan ditemui</p>
        {results.map((item, idx) => (
          <div key={idx} className="card p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-xl">{typeIcons[item.type]}</span>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900 dark:text-white">{item.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-slate-500">{item.desc}</span>
                  <span className="badge-info text-[10px]">{item.modul}</span>
                </div>
              </div>
              <span className="badge-info">{item.type}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
