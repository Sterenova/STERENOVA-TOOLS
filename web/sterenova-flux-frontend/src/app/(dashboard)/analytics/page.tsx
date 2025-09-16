'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
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
  ArrowUpRight,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Target
} from 'lucide-react';

export default function AnalyticsPage() {
  const stats = {
    totalRevenue: 15680,
    monthlyRevenue: 4200,
    revenueGrowth: 12.5,
    totalQuotes: 24,
    monthlyQuotes: 8,
    quotesGrowth: 8.2,
    totalInvoices: 18,
    monthlyInvoices: 5,
    invoicesGrowth: -3.1,
    conversionRate: 75.2,
    averageQuoteValue: 653,
    averageInvoiceValue: 871
  };

  const quickActions = [
    {
      title: 'Rapport mensuel',
      description: 'Générer le rapport du mois',
      icon: FileText,
      href: '#',
      variant: 'default' as const
    },
    {
      title: 'Export données',
      description: 'Exporter les données d\'analyse',
      icon: Receipt,
      href: '#',
      variant: 'secondary' as const
    },
    {
      title: 'Configurer alertes',
      description: 'Paramétrer les notifications',
      icon: Target,
      href: '#',
      variant: 'outline' as const
    }
  ];

  return (
    <PageWrapper
      title="Analyses et rapports"
      description="Analysez vos performances et prenez des décisions éclairées"
    >
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Chiffre d'affaires
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-sterenova text-white">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">€{stats.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">
                    +{stats.revenueGrowth}% ce mois
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taux de conversion
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <Target className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                <p className="text-xs text-muted-foreground">Devis → Factures</p>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valeur moyenne devis
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">€{stats.averageQuoteValue}</p>
                <p className="text-xs text-muted-foreground">Par devis</p>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Valeur moyenne facture
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <Receipt className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">€{stats.averageInvoiceValue}</p>
                <p className="text-xs text-muted-foreground">Par facture</p>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
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

      {/* Graphiques et analyses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Évolution du CA</span>
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
              <PieChart className="h-5 w-5 text-green-500" />
              <span>Répartition des revenus</span>
            </CardTitle>
            <CardDescription>
              Répartition par type de service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Graphique en cours de développement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyses détaillées */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <span>Métriques clés</span>
            </CardTitle>
            <CardDescription>
              Indicateurs de performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Devis créés</span>
                </div>
                <Badge variant="secondary">{stats.monthlyQuotes}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Factures émises</span>
                </div>
                <Badge variant="outline">{stats.monthlyInvoices}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">CA mensuel</span>
                </div>
                <Badge variant="default">€{stats.monthlyRevenue.toLocaleString()}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span>Tendances</span>
            </CardTitle>
            <CardDescription>
              Évolution de vos indicateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Croissance CA</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+{stats.revenueGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Croissance devis</span>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">+{stats.quotesGrowth}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="font-medium">Croissance factures</span>
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500 font-medium">{stats.invoicesGrowth}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section des insights */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Insights et recommandations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-700">Performance positive</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Votre chiffre d'affaires a augmenté de {stats.revenueGrowth}% ce mois. 
                    Continuez sur cette lancée en optimisant vos processus de vente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Target className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-700">Taux de conversion élevé</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Avec un taux de conversion de {stats.conversionRate}%, 
                    vos devis sont très qualifiés. Concentrez-vous sur la qualité du service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
