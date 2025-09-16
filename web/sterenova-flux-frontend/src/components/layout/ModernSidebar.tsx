'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, FileText, Receipt, Users, Settings, ChevronLeft,
  Plus, TrendingUp, Calendar, BarChart3
} from 'lucide-react';

interface ModernSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function ModernSidebar({ isCollapsed = false, onToggle }: ModernSidebarProps) {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mettre à jour la section active quand le pathname change
  useEffect(() => {
    if (pathname === '/dashboard' || pathname === '/') {
      setActiveSection('dashboard');
    } else if (pathname === '/quotes') {
      setActiveSection('quotes');
    } else if (pathname === '/invoices') {
      setActiveSection('invoices');
    } else if (pathname === '/clients') {
      setActiveSection('clients');
    } else if (pathname === '/analytics') {
      setActiveSection('analytics');
    } else if (pathname === '/calendar') {
      setActiveSection('calendar');
    } else if (pathname === '/settings') {
      setActiveSection('settings');
    }
  }, [pathname]);

  const navigationItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, href: '/dashboard', badge: null },
    { id: 'quotes', label: 'Devis', icon: FileText, href: '/quotes', badge: '24' },
    { id: 'invoices', label: 'Factures', icon: Receipt, href: '/invoices', badge: '18' },
    { id: 'clients', label: 'Clients', icon: Users, href: '/clients', badge: '42' },
    { id: 'analytics', label: 'Analyses', icon: BarChart3, href: '/analytics', badge: null },
    { id: 'calendar', label: 'Calendrier', icon: Calendar, href: '/calendar', badge: null }
  ];

  const quickActions = [
    { label: 'Nouveau devis', icon: Plus, href: '/quotes/new', variant: 'default' as const },
    { label: 'Nouvelle facture', icon: Plus, href: '/invoices/new', variant: 'secondary' as const },
    { label: 'Nouveau client', icon: Plus, href: '/clients/new', variant: 'outline' as const }
  ];

  return (
    <aside className={`
      fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-300 ease-in-out
      bg-card border-r border-border
      ${isCollapsed ? '-translate-x-full' : 'translate-x-0'}
      md:relative md:top-0 md:translate-x-0
    `}>
      <div className="flex h-full flex-col">
        {/* En-tête de la sidebar */}

        {/* Navigation principale */}
        <nav className="flex-1 space-y-2 p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-sterenova text-white shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
                onClick={() => setActiveSection(item.id)}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "default"}
                    className={` ${isActive ? 'bg-white/20 text-white border-white/30' : ''} `}
                  >
                    {item.badge}
                  </Badge>
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions rapides */}
        <div className="border-t border-border p-4 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground px-3">Actions rapides</h3>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button key={index} variant={action.variant} size="sm" className="w-full justify-start" asChild>
                <a href={action.href}>
                  <Icon className="h-4 w-4 mr-2" /> {action.label}
                </a>
              </Button>
            );
          })}
        </div>

        {/* Statistiques rapides */}
        <div className="border-t border-border p-4 space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground px-3">Aperçu</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Chiffre d'affaires</span>
              <span className="text-sm font-medium text-foreground">€15,680</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Devis en attente</span>
              <span className="text-sm font-medium text-foreground">8</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 bg-muted/30 rounded-lg">
              <span className="text-sm text-muted-foreground">Factures impayées</span>
              <span className="text-sm font-medium text-foreground">5</span>
            </div>
          </div>
        </div>

        {/* Paramètres */}
        <div className="border-t border-border p-4">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <a href="/settings">
              <Settings className="h-4 w-4 mr-2" /> Paramètres
            </a>
          </Button>
        </div>
      </div>
    </aside>
  );
}
