'use client';

import { ReactNode } from 'react';
import { ModernHeader } from './ModernHeader';
import { ModernSidebar } from './ModernSidebar';
import { useState } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />
      
      <div className="flex">
        <ModernSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}