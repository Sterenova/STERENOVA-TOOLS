'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Mail,
  Shield
} from 'lucide-react';
import Link from 'next/link';
import { logout, login } from '@/services/keycloak';
import { useRouter } from 'next/navigation';

export function UserHeader() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Forcer l'authentification Keycloak
    login();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
        <div className="w-20 h-4 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Afficher un bouton de connexion sur les pages d'accueil
    return (
      <Button onClick={handleLogin} variant="outline">
        <User className="w-4 h-4 mr-2" />
        Se connecter
      </Button>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const hasAdminRole = user.roles?.includes('admin') || user.roles?.includes('realm-admin');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 h-10 px-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt={user.preferred_username} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getInitials(user.preferred_username || user.email || 'U')}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="text-sm font-medium text-foreground">
              {user.preferred_username || 'Utilisateur'}
            </div>
            <div className="text-xs text-muted-foreground">
              {user.email}
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.preferred_username || 'Utilisateur'}
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{user.email}</span>
            </div>
            {hasAdminRole && (
              <div className="flex items-center space-x-1 text-xs text-primary">
                <Shield className="h-3 w-3" />
                <span>Administrateur</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Mon profil</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
