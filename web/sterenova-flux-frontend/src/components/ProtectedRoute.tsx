'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { login } from '@/services/keycloak';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Si pas authentifié, rediriger vers la page d'accueil ou forcer le login
      const currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '/flux') {
        // Forcer l'authentification Keycloak
        login();
      } else {
        // Rediriger vers la page d'accueil
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      fallback || (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Authentification requise</h2>
            <p className="text-muted-foreground mb-4">
              Vous devez être connecté pour accéder à cette page.
            </p>
            <button
              onClick={login}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Se connecter
            </button>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}