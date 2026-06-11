'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const demoJalinan = [
  { id: '1', nama_organisasi: 'Jabatan Pendidikan Negeri Johor', jenis: 'Agensi' as const, pegawai_hubungan: 'Pn. Noraini bt Yusoff', telefon: '07-2345678', catatan: 'Program bimbingan PK' },
  { id: '2', nama_organisasi: 'Persatuan Ibu Bapa Kanak-kanak Khas Johor', jenis: 'NGO' as const, pegawai_hubungan: 'En. Ahmad Faizal', telefon: '012-3456789', catatan: 'Sumbangan peralatan' },
  { id: '3', nama_organisasi: 'Petronas Dagangan Bhd', jenis: 'Syarikat' as const, pegawai_hubungan: 'Pn. Sarah Tan', telefon: '03-8765432', catatan: 'Program CSR tahunan' },
  { id: '4', nama_organisasi: 'PIBG SK Senai', jenis: 'Komuniti' as const, pegawai_hubungan: 'En. Roslan bin Mohd', telefon: '019-8765432', catatan: 'Sokongan aktiviti sekolah' },
  { id: '5', nama_organisasi: 'Hospital Sultanah Aminah', jenis: 'Agensi' as const, pegawai_hubungan: 'Dr. Lim Wei Ming', telefon: '07-2233445', catatan: 'Rujukan terapi murid' },
  { id: '6', nama_organisasi: 'Kiwanis Club Johor Bahru', jenis: 'NGO' as const, pegawai_hubungan: 'Datuk Hj. Kamal', telefon: '012-7654321', catatan: 'Tajaan program khas' },
]

export default function Modul5Page() {
  const [showForm, setShowForm] = useState(false)
  const [filterJenis, setFilterJenis] = useState<string>('Semua')

  const filtered = filterJenis === 'Semua' ? demoJalinan : demoJalinan.filter(j => j.jenis === filterJenis)

  const jenisColors: Record<string, string> = {
    'Agensi': 'badge-info',
    'NGO': 'badge-success',
    'Syarikat': 'badge-warning',
    'Komuniti': 'badge-danger',
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Jalinan & Jaringan</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 5 &bull; Rakan Strategik & Kolaborasi</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Rakan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['Agensi', 'NGO', 'Syarikat', 'Komuniti'] as const).map(jenis => (
          <div key={jenis} className="stat-card text-center cursor-pointer hover:shadow-md" onClick={() => setFilterJenis(jenis === filterJenis ? 'Semua' : jenis)}>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{demoJalinan.filter(j => j.jenis === jenis).length}</p>
            <p className="text-xs text-slate-500">{jenis}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {['Semua', 'Agensi', 'NGO', 'Syarikat', 'Komuniti'].map(j => (
          <button key={j} onClick={() => setFilterJenis(j)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterJenis === j ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
            {j}
          </button>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tambah Rakan Strategik</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Organisasi</label>
              <input type="text" className="input-field" placeholder="Nama..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis</label>
              <select className="input-field">
                <option value="Agensi">Agensi</option>
                <option value="NGO">NGO</option>
                <option value="Syarikat">Syarikat</option>
                <option value="Komuniti">Komuniti</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pegawai Hubungan</label>
              <input type="text" className="input-field" placeholder="Nama pegawai" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No Telefon</label>
              <input type="tel" className="input-field" placeholder="012-3456789" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Surat Kerjasama</label>
              <input type="file" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan</label>
              <input type="text" className="input-field" placeholder="Catatan..." />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="button" className="btn-primary">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className={jenisColors[item.jenis]}>{item.jenis}</span>
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{item.nama_organisasi}</h4>
            <div className="space-y-1.5 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {item.pegawai_hubungan}
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {item.telefon}
              </div>
              <p className="text-xs text-slate-500 mt-2 italic">{item.catatan}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
