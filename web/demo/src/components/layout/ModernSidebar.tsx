'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Home,
  ChevronLeft
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ModernSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ModernSidebar({ isOpen, onToggle }: ModernSidebarProps) {
  const { user, isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navigationItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      public: true,
    },
  ];

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:h-screen lg:top-0'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => {
            // Skip if not authenticated and item requires auth
            if (!item.public && !isAuthenticated) return null;
            
            // Skip if admin only and user is not admin
            if ((!user?.roles.includes('admin'))) return null;

            const Icon = item.icon;
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive(item.href) ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'w-full justify-start',
                    isActive(item.href) ? '' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {user?.roles.includes('admin') && (
                    <Badge variant="secondary" className="ml-auto">
                      Admin
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        {isAuthenticated && user && (
          <div className="border-t border-border p-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-sm font-medium">
                    {user.preferred_username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.preferred_username}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              
              {user.roles.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="outline" className="text-xs">
                      {role}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}