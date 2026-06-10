'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const folders = [
  { name: 'PBPPP', count: 12, icon: '📋', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'PENCERAPAN', count: 4, icon: '✅', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'PROGRAM', count: 18, icon: '📁', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'KEWANGAN', count: 8, icon: '💰', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { name: 'JALINAN', count: 5, icon: '🤝', color: 'bg-teal-100 dark:bg-teal-900/30' },
  { name: 'ICT', count: 6, icon: '💻', color: 'bg-indigo-100 dark:bg-indigo-900/30' },
  { name: 'SUMBANGAN', count: 7, icon: '🎤', color: 'bg-pink-100 dark:bg-pink-900/30' },
  { name: 'PENCAPAIAN', count: 9, icon: '🏆', color: 'bg-gold-100 dark:bg-gold-900/30' },
  { name: 'INOVASI', count: 3, icon: '💡', color: 'bg-cyan-100 dark:bg-cyan-900/30' },
]

const demoFiles = [
  { id: '1', nama: 'RPH_Januari_2024.pdf', folder: 'PBPPP', file_type: 'pdf', file_size: 1200000, tags: ['RPH', 'Januari'], created_at: '2024-01-15' },
  { id: '2', nama: 'Borang_Pencerapan_Feb.pdf', folder: 'PENCERAPAN', file_type: 'pdf', file_size: 800000, tags: ['Pencerapan', 'PGB'], created_at: '2024-02-20' },
  { id: '3', nama: 'Kertas_Kerja_Program_Literasi.docx', folder: 'PROGRAM', file_type: 'docx', file_size: 500000, tags: ['Kertas Kerja', 'Kurikulum'], created_at: '2024-02-01' },
  { id: '4', nama: 'Resit_ABM_Mac2024.jpg', folder: 'KEWANGAN', file_type: 'image', file_size: 300000, tags: ['Resit', 'ABM'], created_at: '2024-03-10' },
  { id: '5', nama: 'Sijil_Johan_Inovasi.pdf', folder: 'PENCAPAIAN', file_type: 'pdf', file_size: 900000, tags: ['Sijil', 'Daerah'], created_at: '2024-04-05' },
  { id: '6', nama: 'Laporan_CSR_Petronas.pdf', folder: 'JALINAN', file_type: 'pdf', file_size: 1500000, tags: ['Laporan', 'CSR'], created_at: '2024-05-12' },
]

export default function DokumenPage() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredFiles = demoFiles.filter(f => {
    const matchFolder = !selectedFolder || f.folder === selectedFolder
    const matchSearch = !searchQuery || 
      f.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchFolder && matchSearch
  })

  const formatSize = (bytes: number) => {
    if (bytes >= 1000000) return (bytes / 1000000).toFixed(1) + ' MB'
    return (bytes / 1000).toFixed(0) + ' KB'
  }

  const fileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄'
      case 'docx': return '📝'
      case 'image': return '🖼️'
      default: return '📎'
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pengurusan Dokumen</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Folder automatik mengikut modul</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Muat Naik
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            className="input-field pl-9"
            placeholder="Cari dokumen, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 mb-6">
        {folders.map((folder) => (
          <button
            key={folder.name}
            onClick={() => setSelectedFolder(selectedFolder === folder.name ? null : folder.name)}
            className={`p-3 rounded-xl text-center transition-all hover:shadow-md ${
              selectedFolder === folder.name
                ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <span className="text-2xl block">{folder.icon}</span>
            <p className="text-[10px] font-medium text-slate-700 dark:text-slate-300 mt-1 truncate">{folder.name}</p>
            <p className="text-[10px] text-slate-400">{folder.count}</p>
          </button>
        ))}
      </div>

      {/* Files List */}
      <div className="card overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 className="font-medium text-slate-900 dark:text-white text-sm">
            {selectedFolder ? `Folder: ${selectedFolder}` : 'Semua Dokumen'}
            <span className="text-slate-400 ml-2">({filteredFiles.length})</span>
          </h3>
          {selectedFolder && (
            <button onClick={() => setSelectedFolder(null)} className="text-xs text-primary-600 hover:underline">
              Lihat Semua
            </button>
          )}
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {filteredFiles.map((file) => (
            <div key={file.id} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <span className="text-xl">{fileTypeIcon(file.file_type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.nama}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-slate-400">{formatSize(file.file_size)}</span>
                  <span className="text-[10px] text-slate-400">&bull;</span>
                  <span className="text-[10px] text-slate-400">{file.folder}</span>
                  {file.tags?.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-500">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-500" title="Preview">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                <button className="p-1.5 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500" title="Download">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
