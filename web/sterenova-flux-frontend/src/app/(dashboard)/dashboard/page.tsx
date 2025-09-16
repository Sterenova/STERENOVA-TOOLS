'use client';

import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Receipt, 
  Users,
  Plus,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { apiService } from '@/lib/api';
import { DashboardStats, Quote, Invoice, Client } from '@/types';

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <PageWrapper title="Tableau de bord" description="Vue d'ensemble de votre activité">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageWrapper>
    );
  }

  if (!stats) {
    return (
      <PageWrapper title="Tableau de bord" description="Vue d'ensemble de votre activité">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Impossible de charger les statistiques</p>
          </CardContent>
        </Card>
      </PageWrapper>
    );
  }

  const statCards = [
    {
      title: 'Total Devis',
      value: stats.totalQuotes,
      change: stats.monthlyQuotes,
      changeType: 'increase' as const,
      icon: FileText,
      color: 'bg-blue-500',
      href: '/quotes'
    },
    {
      title: 'Total Factures',
      value: stats.totalInvoices,
      change: stats.monthlyInvoices,
      changeType: 'increase' as const,
      icon: Receipt,
      color: 'bg-green-500',
      href: '/invoices'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      change: 0,
      changeType: 'neutral' as const,
      icon: Users,
      color: 'bg-purple-500',
      href: '/clients'
    },
    {
      title: 'Chiffre d\'affaires',
      value: `€${stats.totalRevenue.toLocaleString()}`,
      change: stats.monthlyRevenue,
      changeType: 'increase' as const,
      icon: DollarSign,
      color: 'bg-gradient-sterenova',
      href: '/analytics'
    }
  ];

  const quickActions = [
    {
      title: 'Nouveau devis',
      description: 'Créer un nouveau devis',
      icon: FileText,
      href: '/quotes/new',
      variant: 'default' as const
    },
    {
      title: 'Nouvelle facture',
      description: 'Créer une nouvelle facture',
      icon: Receipt,
      href: '/invoices/new',
      variant: 'secondary' as const
    },
    {
      title: 'Nouveau client',
      description: 'Ajouter un nouveau client',
      icon: Users,
      href: '/clients/new',
      variant: 'outline' as const
    }
  ];

  return (
    <ProtectedRoute>
      <PageWrapper 
        title="Tableau de bord" 
        description="Vue d'ensemble de votre activité et de vos performances"
      >
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.change !== 0 && (
                    <div className="flex items-center space-x-1 mt-1">
                      {stat.changeType === 'increase' ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${
                        stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change > 0 ? '+' : ''}{stat.change} ce mois
                      </span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                  <a href={stat.href}>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${
                    action.variant === 'default' ? 'bg-primary text-primary-foreground' :
                    action.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Graphique de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Évolution du chiffre d'affaires</span>
            </CardTitle>
            <CardDescription>
              Performance mensuelle de votre activité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Graphique en cours de développement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>Activité récente</span>
            </CardTitle>
            <CardDescription>
              Vos derniers devis et factures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">DEV-202509-009</p>
                    <p className="text-sm text-muted-foreground">Devis créé</p>
                  </div>
                </div>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Receipt className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">FAC-202509-005</p>
                    <p className="text-sm text-muted-foreground">Facture envoyée</p>
                  </div>
                </div>
                <Badge variant="outline">Envoyée</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section des clients top */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Clients principaux</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topClients.slice(0, 6).map((client, index) => (
                <div key={client.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-8 w-8 bg-gradient-sterenova rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      </PageWrapper>
    </ProtectedRoute>
  );
}
