'use client';

import { useState } from 'react';
import { ModernHeader } from './ModernHeader';
import { ModernSidebar } from './ModernSidebar';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showHeader?: boolean;
  showSidebar?: boolean;
}

export function PageWrapper({ 
  children, 
  title, 
  description, 
  showHeader = false, 
  showSidebar = false 
}: PageWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - seulement si demandé explicitement */}
      {showHeader && (
        <ModernHeader 
          onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
      )}

      <div className="flex">
        {/* Sidebar - seulement si demandée explicitement */}
        {showSidebar && (
          <ModernSidebar 
            isCollapsed={!isSidebarOpen} 
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
        )}

        {/* Contenu principal */}
        <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${showSidebar ? 'md:ml-64' : ''}
        `}>
          {/* En-tête de page avec dégradé Sterenova */}
          {(title || description) && (
            <div className="bg-gradient-sterenova text-white">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {title && (
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-lg text-white/90 max-w-3xl">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Contenu de la page */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay pour mobile */}
      {isSidebarOpen && showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
