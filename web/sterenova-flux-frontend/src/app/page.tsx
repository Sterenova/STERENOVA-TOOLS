'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Receipt, Users, TrendingUp, Star, BarChart3, Calendar } from 'lucide-react';
import { APP_NAME, APP_DESCRIPTION } from '@/config/app';
import { apiService } from '@/lib/api';
import { DashboardStats } from '@/types';

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Chargement de {APP_NAME}</h2>
          <p className="text-muted-foreground">Préparation de votre espace de gestion...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-24 h-24 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="text-4xl">⚠️</div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Erreur de chargement</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Image src="/logo.svg" alt={APP_NAME} width={32} height={32} />
              <span className="text-xl font-bold text-foreground">{APP_NAME}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="w-32 h-32 flex items-center justify-center mx-auto mb-8">
              <Image src="/logo.svg" alt={APP_NAME} width={128} height={128} />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Bienvenue sur <span className="text-primary">{APP_NAME}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              {APP_DESCRIPTION}. Gestion complète de vos devis, factures et clients en un seul endroit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-4">
                  <FileText className="w-5 h-5 mr-2" />
                  Accéder au tableau de bord
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                Voir les statistiques
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi choisir {APP_NAME} ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une solution complète pour tous vos besoins de gestion commerciale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-background rounded-2xl border border-border shadow-lg">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Gestion des Devis</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Créez et gérez vos devis professionnels avec un système de numérotation automatique et un suivi complet
              </p>
              <div className="text-center">
                <span className="text-4xl font-bold text-primary block">
                  {stats.totalQuotes}
                </span>
                <p className="text-muted-foreground">devis créés</p>
              </div>
            </div>
            
            <div className="text-center p-8 bg-background rounded-2xl border border-border shadow-lg">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Receipt className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Facturation</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Générez des factures professionnelles et suivez vos paiements avec un système de relance automatique
              </p>
              <div className="text-center">
                <span className="text-4xl font-bold text-secondary block">
                  {stats.totalInvoices}
                </span>
                <p className="text-muted-foreground">factures émises</p>
              </div>
            </div>
            
            <div className="text-center p-8 bg-background rounded-2xl border border-border shadow-lg">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">Gestion Clients</h3>
              <p className="text-muted-foreground text-lg mb-6">
                Centralisez vos informations clients et suivez l'historique de vos relations commerciales
              </p>
              <div className="text-center">
                <span className="text-4xl font-bold text-accent block">
                  {stats.totalClients}
                </span>
                <p className="text-muted-foreground">clients gérés</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Votre activité en chiffres
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Suivez vos performances et votre croissance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-gradient-sterenova rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                €{stats.totalRevenue.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Chiffre d'affaires total</p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {stats.monthlyQuotes}
              </h3>
              <p className="text-muted-foreground">Devis ce mois</p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {stats.monthlyInvoices}
              </h3>
              <p className="text-muted-foreground">Factures ce mois</p>
            </div>
            
            <div className="text-center p-6 bg-card rounded-xl border border-border">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                €{stats.monthlyRevenue.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">CA ce mois</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Prêt à optimiser votre gestion commerciale ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez des milliers de professionnels qui utilisent déjà {APP_NAME} pour leur activité
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-4">
              <Star className="w-5 h-5 mr-2" />
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
