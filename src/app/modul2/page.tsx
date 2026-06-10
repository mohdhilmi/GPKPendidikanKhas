'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

const demoPencerapan = [
  { id: '1', tarikh: '2024-02-15', pegawai_penyelia: 'Pn. Salmah bt Ahmad (PGB)', status: 'Selesai' as const, catatan: 'Perancangan RPH tersusun', tindakan: 'Tambah ABM digital' },
  { id: '2', tarikh: '2024-05-20', pegawai_penyelia: 'En. Razak bin Ismail (SIP+)', status: 'Selesai' as const, catatan: 'PdPc aktif, penglibatan murid baik', tindakan: 'Dokumentasi aktiviti' },
  { id: '3', tarikh: '2024-08-10', pegawai_penyelia: 'Pn. Fatimah bt Hassan (SISC+)', status: 'Belum' as const, catatan: '', tindakan: '' },
  { id: '4', tarikh: '2024-11-05', pegawai_penyelia: 'Pn. Salmah bt Ahmad (PGB)', status: 'Belum' as const, catatan: '', tindakan: '' },
]

export default function Modul2Page() {
  const [showForm, setShowForm] = useState(false)
  const [selectedPencerapan, setSelectedPencerapan] = useState<string | null>(null)

  const selesaiCount = demoPencerapan.filter(p => p.status === 'Selesai').length
  const belumCount = demoPencerapan.filter(p => p.status === 'Belum').length

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Penyeliaan & Pemantauan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Modul 2 &bull; Jadual Pencerapan & Borang
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Pencerapan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{demoPencerapan.length}</p>
          <p className="text-xs text-slate-500">Jumlah Pencerapan</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-emerald-600">{selesaiCount}</p>
          <p className="text-xs text-slate-500">Selesai</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-2xl font-bold text-amber-600">{belumCount}</p>
          <p className="text-xs text-slate-500">Belum</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tambah Jadual Pencerapan</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tarikh</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pegawai Penyelia</label>
              <input type="text" className="input-field" placeholder="Nama dan jawatan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <select className="input-field">
                <option value="Belum">Belum</option>
                <option value="Selesai">Selesai</option>
                <option value="Ditangguh">Ditangguh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Borang Pencerapan (PDF)</label>
              <input type="file" className="input-field" accept=".pdf" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan Penambahbaikan</label>
              <textarea className="input-field" rows={2} placeholder="Catatan..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tindakan Susulan</label>
              <textarea className="input-field" rows={2} placeholder="Tindakan..." />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="button" className="btn-primary">Simpan</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Pencerapan Cards */}
      <div className="space-y-4">
        {demoPencerapan.map((item) => (
          <div key={item.id} className="card p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  item.status === 'Selesai' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                    : item.status === 'Ditangguh'
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-amber-100 dark:bg-amber-900/30'
                }`}>
                  {item.status === 'Selesai' ? (
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{item.pegawai_penyelia}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Tarikh: {new Date(item.tarikh).toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  {item.catatan && (
                    <div className="mt-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Catatan:</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{item.catatan}</p>
                    </div>
                  )}
                  {item.tindakan && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Tindakan Susulan:</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{item.tindakan}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status === 'Selesai' ? (
                  <span className="badge-success">Selesai</span>
                ) : item.status === 'Ditangguh' ? (
                  <span className="badge-danger">Ditangguh</span>
                ) : (
                  <span className="badge-warning">Belum</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
