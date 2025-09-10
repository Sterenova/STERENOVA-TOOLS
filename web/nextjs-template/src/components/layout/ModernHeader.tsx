'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { 
  Menu, 
  X, 
  Home,
  User,
  Shield,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { logout } from '@/services/keycloak';

interface ModernHeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function ModernHeader({ onMenuToggle, isMenuOpen }: ModernHeaderProps) {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const closeMobileNav = () => {
    setShowMobileNav(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container-fluid px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo et Titre */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onMenuToggle}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="relative h-8 w-8">
                  <Link href="/">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">M</span>
                    </div>
                  </Link>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground">Microfrontend Template</h1>
                  <p className="text-xs text-muted-foreground">Next.js + TypeScript + shadcn/ui</p>
                </div>
              </div>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button 
                    variant={isActive('/') ? 'default' : 'ghost'} 
                    size="sm" 
                    className={isActive('/') ? '' : 'text-muted-foreground hover:text-foreground'}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link href="/profile">
                      <Button 
                        variant={isActive('/profile') ? 'default' : 'ghost'} 
                        size="sm" 
                        className={isActive('/profile') ? '' : 'text-muted-foreground hover:text-foreground'}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    
                    {user?.roles.includes('admin') && (
                      <Link href="/admin">
                        <Button 
                          variant={isActive('/admin') ? 'default' : 'ghost'} 
                          size="sm" 
                          className={isActive('/admin') ? '' : 'text-muted-foreground hover:text-foreground'}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </div>
            </nav>

            {/* Actions et User */}
            <div className="flex items-center space-x-3">
              {/* Mobile Navigation Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative"
                  title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              {/* User Info */}
              {isAuthenticated && user && (
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm font-medium">{user.preferred_username}</span>
                    {user.roles.includes('admin') && (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>Admin</span>
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {showMobileNav && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed top-16 right-0 h-full w-80 bg-card border-l border-border shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Navigation</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileNav}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-1 p-4">
              <Link href="/" onClick={closeMobileNav}>
                <Button 
                  variant={isActive('/') ? 'default' : 'ghost'} 
                  size="sm" 
                  className="w-full justify-start"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link href="/profile" onClick={closeMobileNav}>
                    <Button 
                      variant={isActive('/profile') ? 'default' : 'ghost'} 
                      size="sm" 
                      className="w-full justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  
                  {user?.roles.includes('admin') && (
                    <Link href="/admin" onClick={closeMobileNav}>
                      <Button 
                        variant={isActive('/admin') ? 'default' : 'ghost'} 
                        size="sm" 
                        className="w-full justify-start"
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
} 