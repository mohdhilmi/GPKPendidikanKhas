'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const demoInovasi = [
  {
    id: '1', nama: 'ABM Sensori Digital Interactive', tahun: 2024,
    penerangan: 'Alat bantu mengajar digital berasaskan rangsangan sensori untuk murid autisme dan ADHD. Menggabungkan visual, audio, dan sentuhan dalam pembelajaran.',
    kategori: 'Bahan Bantu Mengajar', video_url: 'https://youtube.com/watch?v=abc123',
  },
  {
    id: '2', nama: 'Sistem e-RPH Automatik', tahun: 2024,
    penerangan: 'Sistem pengurusan RPH menggunakan Google Apps Script yang auto-generate template RPH mengikut standard PK dan boleh dikongsi secara real-time.',
    kategori: 'Pengurusan & Pentadbiran', video_url: '',
  },
  {
    id: '3', nama: 'Kit Literasi Multisensori PK', tahun: 2023,
    penerangan: 'Kit pembelajaran literasi yang menggunakan pendekatan multisensori (Orton-Gillingham) untuk murid disleksia dan lambat membaca.',
    kategori: 'Bahan Bantu Mengajar', video_url: 'https://youtube.com/watch?v=def456',
  },
]

export default function Modul9Page() {
  const [showForm, setShowForm] = useState(false)
  const [selectedInovasi, setSelectedInovasi] = useState<string | null>(null)

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Amalan Terbaik & Inovasi</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 9 &bull; Showcase Innovation & Best Practice Repository</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Inovasi
        </button>
      </div>

      {/* Showcase Banner */}
      <div className="card p-6 mb-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Innovation Showcase</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Dokumentasi inovasi dan amalan terbaik dalam Pendidikan Khas</p>
          </div>
          <div className="ml-auto">
            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{demoInovasi.length}</span>
            <p className="text-xs text-slate-500">Inovasi</p>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tambah Inovasi / Amalan Terbaik</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Inovasi</label>
              <input type="text" className="input-field" placeholder="Nama..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tahun</label>
              <input type="number" className="input-field" placeholder="2024" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Penerangan</label>
              <textarea className="input-field" rows={3} placeholder="Penerangan inovasi..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
              <input type="text" className="input-field" placeholder="Bahan Bantu Mengajar" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL Video</label>
              <input type="url" className="input-field" placeholder="https://youtube.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gambar</label>
              <input type="file" className="input-field" accept="image/*" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Dokumen</label>
              <input type="file" className="input-field" accept=".pdf,.doc,.docx" />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="button" className="btn-primary">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Innovation Cards */}
      <div className="space-y-4">
        {demoInovasi.map((item) => (
          <div key={item.id} className="card overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.nama}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge-info">{item.kategori}</span>
                        <span className="text-xs text-slate-400">{item.tahun}</span>
                      </div>
                    </div>
                    {item.video_url && (
                      <a href={item.video_url} target="_blank" className="flex items-center gap-1 text-red-500 hover:text-red-600 text-sm">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Video
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">{item.penerangan}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
