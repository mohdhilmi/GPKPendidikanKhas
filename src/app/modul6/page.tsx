'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type Tab = 'projek' | 'kemahiran'

const demoProjekICT = [
  { id: '1', nama_projek: 'Website Pendidikan Khas SK Senai', tahun: 2024, deskripsi: 'Pembangunan laman web khas untuk unit PK', link: 'https://pk.sksenai.edu.my' },
  { id: '2', nama_projek: 'Sistem e-RPH Digital', tahun: 2024, deskripsi: 'Sistem pengurusan RPH secara digital menggunakan Google Sheets + AppScript', link: '' },
  { id: '3', nama_projek: 'Video Pembelajaran Interaktif', tahun: 2023, deskripsi: 'Siri video pembelajaran BM untuk murid berkeperluan khas', link: 'https://youtube.com/playlist' },
  { id: '4', nama_projek: 'Chatbot AI Pendidikan Khas', tahun: 2024, deskripsi: 'Chatbot bantuan ibu bapa menggunakan AI untuk info pendidikan khas', link: '' },
]

const demoKemahiran = [
  { id: '1', kategori: 'Google Workspace' as const, nama_kemahiran: 'Google Sheets Advanced', tahap: 'Mahir' as const },
  { id: '2', kategori: 'Google Workspace' as const, nama_kemahiran: 'Google Sites', tahap: 'Mahir' as const },
  { id: '3', kategori: 'Canva' as const, nama_kemahiran: 'Canva Pro Design', tahap: 'Mahir' as const },
  { id: '4', kategori: 'AI Tools' as const, nama_kemahiran: 'ChatGPT / Claude', tahap: 'Mahir' as const },
  { id: '5', kategori: 'AI Tools' as const, nama_kemahiran: 'Gamma.app (AI Presentation)', tahap: 'Pertengahan' as const },
  { id: '6', kategori: 'Microsoft Office' as const, nama_kemahiran: 'PowerPoint Advanced', tahap: 'Mahir' as const },
  { id: '7', kategori: 'Microsoft Office' as const, nama_kemahiran: 'Excel (Data Analysis)', tahap: 'Pertengahan' as const },
  { id: '8', kategori: 'Website Development' as const, nama_kemahiran: 'HTML/CSS/JavaScript', tahap: 'Pertengahan' as const },
  { id: '9', kategori: 'Website Development' as const, nama_kemahiran: 'Next.js / React', tahap: 'Asas' as const },
]

const kategoriIcons: Record<string, string> = {
  'Google Workspace': '🟢',
  'Canva': '🎨',
  'AI Tools': '🤖',
  'Microsoft Office': '🔷',
  'Website Development': '🌐',
}

const tahapColors: Record<string, string> = {
  'Mahir': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'Pertengahan': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Asas': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

export default function Modul6Page() {
  const [activeTab, setActiveTab] = useState<Tab>('projek')
  const [showForm, setShowForm] = useState(false)

  const kemahiranByKategori = demoKemahiran.reduce((acc, item) => {
    if (!acc[item.kategori]) acc[item.kategori] = []
    acc[item.kategori].push(item)
    return acc
  }, {} as Record<string, typeof demoKemahiran>)

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">ICT & Digitalisasi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 6 &bull; Projek ICT & Kemahiran Digital</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 max-w-xs">
        <button onClick={() => setActiveTab('projek')} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'projek' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>
          Projek ICT
        </button>
        <button onClick={() => setActiveTab('kemahiran')} className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'kemahiran' ? 'bg-white dark:bg-slate-700 text-primary-600 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>
          Kemahiran
        </button>
      </div>

      {/* Projek ICT */}
      {activeTab === 'projek' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {demoProjekICT.map((projek) => (
            <div key={projek.id} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{projek.nama_projek}</h4>
                    <span className="badge-info">{projek.tahun}</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{projek.deskripsi}</p>
                  {projek.link && (
                    <a href={projek.link} target="_blank" className="inline-flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 mt-2 hover:underline">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Lihat Projek
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kemahiran Digital */}
      {activeTab === 'kemahiran' && (
        <div className="space-y-6">
          {Object.entries(kemahiranByKategori).map(([kategori, skills]) => (
            <div key={kategori} className="card p-5">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span>{kategoriIcons[kategori]}</span>
                {kategori}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div key={skill.id} className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 ${tahapColors[skill.tahap]}`}>
                    <span className="text-sm font-medium">{skill.nama_kemahiran}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/50 dark:bg-black/20 font-bold uppercase">
                      {skill.tahap}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
