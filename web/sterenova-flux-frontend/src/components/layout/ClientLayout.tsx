"use client"

import { useState } from "react"
import { ModernHeader } from "./ModernHeader"
import { ModernSidebar } from "./ModernSidebar"

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      <div className="flex">
        <ModernSidebar 
          isCollapsed={!isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <main className={`
          flex-1 transition-all duration-300 ease-in-out`}>
          {children}
        </main>
      </div>
    </div>
  )
}
