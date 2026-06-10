'use client'

import { useState, ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-[280px]">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6 animate-fadeIn">
          {children}
        </main>
      </div>
    </div>
  )
}
