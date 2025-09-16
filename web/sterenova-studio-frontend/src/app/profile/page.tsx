'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Shield, 
  Key,
  LogOut,
  Edit,
  Copy,
  Check,
  Palette
} from 'lucide-react';
import { logout } from '@/services/keycloak';
import { toast } from 'sonner';
import { PageWrapper } from '@/components/layout/PageWrapper';

export default function ProfilePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setIsLoggingOut(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      toast.success('Copié dans le presse-papiers');
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast.error('Erreur lors de la copie');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Chargement du profil</h2>
          <p className="text-muted-foreground">Récupération de vos informations...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Non authentifié</h2>
          <p className="text-muted-foreground mb-6">Vous devez être connecté pour voir votre profil.</p>
          <Button onClick={() => window.location.href = '/'}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const hasAdminRole = user.roles?.includes('admin') || user.roles?.includes('realm-admin');
  const hasUserRole = user.roles?.includes('user') || user.roles?.includes('default-roles-platform');

  return (
    <PageWrapper>
    <div className="container-fluid min-h-screen bg-background">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
            <p className="text-muted-foreground">Gérez vos informations personnelles et paramètres de compte</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profil principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informations personnelles
                </CardTitle>
                <CardDescription>
                  Vos informations de base et identifiants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt={user.preferred_username} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {getInitials(user.preferred_username || user.email || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">
                      {user.preferred_username || 'Utilisateur'}
                    </h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      {hasAdminRole && (
                        <Badge variant="default" className="bg-primary">
                          <Shield className="w-3 h-3 mr-1" />
                          Administrateur
                        </Badge>
                      )}
                      {hasUserRole && (
                        <Badge variant="secondary">
                          Utilisateur
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Détails du compte */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Détails du compte
                </CardTitle>
                <CardDescription>
                  Identifiants techniques et informations système
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">ID Utilisateur</label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                        {user.sub}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(user.sub, 'sub')}
                      >
                        {copiedField === 'sub' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Nom d'utilisateur</label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                        {user.preferred_username || 'N/A'}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(user.preferred_username || '', 'username')}
                      >
                        {copiedField === 'username' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 px-3 py-2 bg-muted rounded-md text-sm font-mono">
                      {user.email}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(user.email || '', 'email')}
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Rôles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Rôles et permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.roles && user.roles.length > 0 ? (
                    user.roles.map((role, index) => (
                      <Badge 
                        key={index} 
                        variant={role.includes('admin') ? 'default' : 'secondary'}
                        className="mr-2 mb-2"
                      >
                        {role}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun rôle assigné</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier le profil
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Changer l'email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Key className="w-4 h-4 mr-2" />
                  Changer le mot de passe
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="w-4 h-4 mr-2" />
                  Paramètres de design
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
  );
}
