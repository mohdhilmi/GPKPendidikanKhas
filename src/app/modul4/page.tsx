'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'

type Tab = 'peruntukan' | 'perbelanjaan' | 'laporan'

const demoPeruntukan = [
  { id: '1', tarikh: '2024-01-15', sumber: 'PCG Pendidikan Khas', jumlah: 5000, catatan: 'Peruntukan tahunan' },
  { id: '2', tarikh: '2024-03-01', sumber: 'Bantuan Khas PPPM', jumlah: 3000, catatan: 'Program khas' },
  { id: '3', tarikh: '2024-06-10', sumber: 'PIBG', jumlah: 2000, catatan: 'Aktiviti murid PK' },
  { id: '4', tarikh: '2024-08-20', sumber: 'Sumbangan Korporat', jumlah: 1500, catatan: 'CSR syarikat' },
]

const demoPerbelanjaan = [
  { id: '1', tarikh: '2024-02-05', item: 'Bahan Bantu Mengajar (ABM)', jumlah: 800, kategori: 'ABM', resit: true },
  { id: '2', tarikh: '2024-02-20', item: 'Alat Tulis Murid PK', jumlah: 500, kategori: 'Keperluan Murid', resit: true },
  { id: '3', tarikh: '2024-03-18', item: 'Kos Program Literasi Khas', jumlah: 1200, kategori: 'Program', resit: true },
  { id: '4', tarikh: '2024-04-10', item: 'Peralatan Sensori', jumlah: 1500, kategori: 'ABM', resit: true },
  { id: '5', tarikh: '2024-05-15', item: 'Pengangkutan Sukan Khas', jumlah: 600, kategori: 'Kokurikulum', resit: true },
  { id: '6', tarikh: '2024-06-20', item: 'Jamuan Hari Anugerah PK', jumlah: 900, kategori: 'Program', resit: false },
  { id: '7', tarikh: '2024-07-05', item: 'Buku Cerita Khas', jumlah: 450, kategori: 'ABM', resit: true },
]

export default function Modul4Page() {
  const [activeTab, setActiveTab] = useState<Tab>('laporan')
  const [showForm, setShowForm] = useState(false)

  const totalPeruntukan = demoPeruntukan.reduce((a, b) => a + b.jumlah, 0)
  const totalPerbelanjaan = demoPerbelanjaan.reduce((a, b) => a + b.jumlah, 0)
  const baki = totalPeruntukan - totalPerbelanjaan

  // Group spending by category for pie chart simulation
  const spendingByCategory = demoPerbelanjaan.reduce((acc, item) => {
    acc[item.kategori] = (acc[item.kategori] || 0) + item.jumlah
    return acc
  }, {} as Record<string, number>)

  const categoryColors: Record<string, string> = {
    'ABM': 'bg-blue-500',
    'Keperluan Murid': 'bg-emerald-500',
    'Program': 'bg-purple-500',
    'Kokurikulum': 'bg-amber-500',
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pengurusan Kewangan</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Modul 4 &bull; Peruntukan, Perbelanjaan & Laporan</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 self-start">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Rekod
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Jumlah Peruntukan</p>
              <p className="text-xl font-bold text-emerald-600">RM {totalPeruntukan.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Jumlah Perbelanjaan</p>
              <p className="text-xl font-bold text-red-600">RM {totalPerbelanjaan.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Baki</p>
              <p className={`text-xl font-bold ${baki >= 0 ? 'text-blue-600' : 'text-red-600'}`}>RM {baki.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6 max-w-md">
        {[
          { key: 'laporan' as Tab, label: 'Laporan' },
          { key: 'peruntukan' as Tab, label: 'Peruntukan' },
          { key: 'perbelanjaan' as Tab, label: 'Perbelanjaan' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Laporan */}
      {activeTab === 'laporan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending by Category */}
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Perbelanjaan Mengikut Kategori</h4>
            <div className="space-y-3">
              {Object.entries(spendingByCategory).map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{cat}</span>
                    <span className="font-medium text-slate-900 dark:text-white">RM {amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${categoryColors[cat] || 'bg-slate-500'}`}
                      style={{ width: `${(amount / totalPerbelanjaan) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{((amount / totalPerbelanjaan) * 100).toFixed(1)}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Usage percentage */}
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Penggunaan Peruntukan</h4>
            <div className="flex items-center justify-center py-8">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-slate-200 dark:text-slate-700" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" className="text-primary-500" strokeWidth="12" fill="none"
                    strokeDasharray={`${(totalPerbelanjaan / totalPeruntukan) * 440} 440`}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {((totalPerbelanjaan / totalPeruntukan) * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs text-slate-500">Digunakan</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="btn-primary text-sm">
                <svg className="w-4 h-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Muat Turun Laporan PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Peruntukan */}
      {activeTab === 'peruntukan' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Tarikh</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Sumber</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Jumlah (RM)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {demoPeruntukan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{new Date(item.tarikh).toLocaleDateString('ms-MY')}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{item.sumber}</td>
                    <td className="px-4 py-3 text-sm font-bold text-emerald-600 text-right">{item.jumlah.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{item.catatan}</td>
                  </tr>
                ))}
                <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold">
                  <td colSpan={2} className="px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">JUMLAH</td>
                  <td className="px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400 text-right">RM {totalPeruntukan.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Perbelanjaan */}
      {activeTab === 'perbelanjaan' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Tarikh</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Kategori</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Jumlah (RM)</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase">Resit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {demoPerbelanjaan.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{new Date(item.tarikh).toLocaleDateString('ms-MY')}</td>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{item.item}</td>
                    <td className="px-4 py-3"><span className="badge-info">{item.kategori}</span></td>
                    <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">{item.jumlah.toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      {item.resit ? <span className="badge-success">Ada</span> : <span className="badge-warning">Tiada</span>}
                    </td>
                  </tr>
                ))}
                <tr className="bg-red-50 dark:bg-red-900/20 font-bold">
                  <td colSpan={3} className="px-4 py-3 text-sm text-red-700 dark:text-red-400">JUMLAH PERBELANJAAN</td>
                  <td className="px-4 py-3 text-sm text-red-700 dark:text-red-400 text-right">RM {totalPerbelanjaan.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
