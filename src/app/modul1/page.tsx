'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type Tab = 'erph' | 'pbd' | 'headcount'

// Demo data
const demoERPH = [
  { id: '1', tajuk: 'RPH Minggu 1-4', bulan: 'Januari', tahun: 2024, jenis: 'pdf' as const, catatan: 'Lengkap' },
  { id: '2', tajuk: 'RPH Minggu 5-8', bulan: 'Februari', tahun: 2024, jenis: 'link' as const, catatan: 'Google Drive' },
  { id: '3', tajuk: 'RPH Minggu 9-12', bulan: 'Mac', tahun: 2024, jenis: 'pdf' as const, catatan: 'Lengkap' },
  { id: '4', tajuk: 'RPH Minggu 13-16', bulan: 'April', tahun: 2024, jenis: 'pdf' as const, catatan: 'Lengkap' },
  { id: '5', tajuk: 'RPH Minggu 17-20', bulan: 'Mei', tahun: 2024, jenis: 'link' as const, catatan: 'Google Drive' },
]

const demoPBD = [
  { id: '1', nama_murid: 'Ahmad bin Ali', kelas: 'PK Bestari', mata_pelajaran: 'BM', tahap_penguasaan: 3 },
  { id: '2', nama_murid: 'Siti Aminah', kelas: 'PK Bestari', mata_pelajaran: 'BM', tahap_penguasaan: 4 },
  { id: '3', nama_murid: 'Muhammad Irfan', kelas: 'PK Bestari', mata_pelajaran: 'Matematik', tahap_penguasaan: 2 },
  { id: '4', nama_murid: 'Nurul Aina', kelas: 'PK Cemerlang', mata_pelajaran: 'BM', tahap_penguasaan: 5 },
  { id: '5', nama_murid: 'Aiman Hakim', kelas: 'PK Cemerlang', mata_pelajaran: 'Matematik', tahap_penguasaan: 3 },
]

const demoHeadcount = [
  { id: '1', mata_pelajaran: 'Bahasa Melayu', kelas: 'PK Bestari', sasaran_lulus: 80, pencapaian_semasa: 75, penggal: 1 },
  { id: '2', mata_pelajaran: 'Matematik', kelas: 'PK Bestari', sasaran_lulus: 70, pencapaian_semasa: 65, penggal: 1 },
  { id: '3', mata_pelajaran: 'Bahasa Melayu', kelas: 'PK Cemerlang', sasaran_lulus: 85, pencapaian_semasa: 88, penggal: 1 },
  { id: '4', mata_pelajaran: 'Sains', kelas: 'PK Cemerlang', sasaran_lulus: 75, pencapaian_semasa: 70, penggal: 1 },
]

export default function Modul1Page() {
  const [activeTab, setActiveTab] = useState<Tab>('erph')
  const [showForm, setShowForm] = useState(false)
  const [searchBulan, setSearchBulan] = useState('')

  const filteredERPH = searchBulan
    ? demoERPH.filter(r => r.bulan.toLowerCase().includes(searchBulan.toLowerCase()))
    : demoERPH

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Perancangan & Pembangunan Pelajaran
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Modul 1 &bull; e-RPH, Rekod PBD & Headcount
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2 self-start"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Rekod
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 max-w-md">
        {[
          { key: 'erph' as Tab, label: 'e-RPH' },
          { key: 'pbd' as Tab, label: 'Rekod PBD' },
          { key: 'headcount' as Tab, label: 'Headcount' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="card p-6 mb-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {activeTab === 'erph' ? 'Tambah e-RPH' : activeTab === 'pbd' ? 'Tambah Rekod PBD' : 'Tambah Headcount'}
          </h3>

          {activeTab === 'erph' && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tajuk</label>
                <input type="text" className="input-field" placeholder="RPH Minggu X-X" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bulan</label>
                <select className="input-field">
                  {['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis</label>
                <select className="input-field">
                  <option value="pdf">Upload PDF</option>
                  <option value="link">Link Google Drive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Fail / Link</label>
                <input type="file" className="input-field" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Catatan</label>
                <textarea className="input-field" rows={2} placeholder="Catatan tambahan..." />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button type="button" className="btn-primary">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
              </div>
            </form>
          )}

          {activeTab === 'pbd' && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Murid</label>
                <input type="text" className="input-field" placeholder="Nama murid" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kelas</label>
                <input type="text" className="input-field" placeholder="PK Bestari" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran</label>
                <input type="text" className="input-field" placeholder="Bahasa Melayu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tahap Penguasaan (1-6)</label>
                <input type="number" className="input-field" min={1} max={6} placeholder="3" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Evidens</label>
                <input type="file" className="input-field" />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button type="button" className="btn-primary">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
              </div>
            </form>
          )}

          {activeTab === 'headcount' && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Mata Pelajaran</label>
                <input type="text" className="input-field" placeholder="Bahasa Melayu" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kelas</label>
                <input type="text" className="input-field" placeholder="PK Bestari" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sasaran Lulus (%)</label>
                <input type="number" className="input-field" min={0} max={100} placeholder="80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pencapaian Semasa (%)</label>
                <input type="number" className="input-field" min={0} max={100} placeholder="75" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Penggal</label>
                <select className="input-field">
                  <option value={1}>Penggal 1</option>
                  <option value={2}>Penggal 2</option>
                </select>
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button type="button" className="btn-primary">Simpan</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Batal</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB: e-RPH */}
      {activeTab === 'erph' && (
        <div>
          {/* Search */}
          <div className="mb-4">
            <div className="relative max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                className="input-field pl-9 text-sm"
                placeholder="Cari mengikut bulan..."
                value={searchBulan}
                onChange={(e) => setSearchBulan(e.target.value)}
              />
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Tajuk</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Bulan</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Jenis</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Catatan</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredERPH.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{item.tajuk}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.bulan} {item.tahun}</td>
                      <td className="px-4 py-3">
                        {item.jenis === 'pdf' ? (
                          <span className="badge-danger">PDF</span>
                        ) : (
                          <span className="badge-info">Link</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.catatan}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
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
                          <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500" title="Padam">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Rekod PBD */}
      {activeTab === 'pbd' && (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{demoPBD.length}</p>
              <p className="text-xs text-slate-500">Jumlah Murid</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {demoPBD.filter(m => m.tahap_penguasaan >= 3).length}
              </p>
              <p className="text-xs text-slate-500">TP 3 ke atas</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-amber-600">
                {demoPBD.filter(m => m.tahap_penguasaan < 3).length}
              </p>
              <p className="text-xs text-slate-500">Perlu Intervensi</p>
            </div>
            <div className="stat-card text-center">
              <p className="text-2xl font-bold text-primary-600">
                {(demoPBD.reduce((a, b) => a + b.tahap_penguasaan, 0) / demoPBD.length).toFixed(1)}
              </p>
              <p className="text-xs text-slate-500">Purata TP</p>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Nama Murid</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Kelas</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Mata Pelajaran</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Tahap Penguasaan</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {demoPBD.map((murid, idx) => (
                    <tr key={murid.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{murid.nama_murid}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{murid.kelas}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{murid.mata_pelajaran}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          murid.tahap_penguasaan >= 4 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          murid.tahap_penguasaan >= 3 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {murid.tahap_penguasaan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {murid.tahap_penguasaan >= 3 ? (
                          <span className="badge-success">Melepasi</span>
                        ) : (
                          <span className="badge-warning">Intervensi</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Headcount */}
      {activeTab === 'headcount' && (
        <div>
          <div className="card overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Mata Pelajaran</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Kelas</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Sasaran (%)</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Pencapaian (%)</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Graf</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {demoHeadcount.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{item.mata_pelajaran}</td>
                      <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{item.kelas}</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-slate-900 dark:text-white">{item.sasaran_lulus}%</td>
                      <td className="px-4 py-3 text-center text-sm font-bold text-primary-600 dark:text-primary-400">{item.pencapaian_semasa}%</td>
                      <td className="px-4 py-3 text-center">
                        {item.pencapaian_semasa >= item.sasaran_lulus ? (
                          <span className="badge-success">Tercapai</span>
                        ) : (
                          <span className="badge-warning">Belum</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-32">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  item.pencapaian_semasa >= item.sasaran_lulus ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${item.pencapaian_semasa}%` }}
                              />
                            </div>
                          </div>
                          {/* Target line indicator */}
                          <div className="relative mt-0.5">
                            <div
                              className="absolute top-0 w-px h-2 bg-red-500"
                              style={{ left: `${item.sasaran_lulus}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
