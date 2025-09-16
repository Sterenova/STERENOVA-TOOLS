'use client';

import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';
import { CreateQuoteForm } from '@/components/quotes/create-quote-form';
import { QuotesTable } from '@/components/quotes/quotes-table';
import { apiService } from '@/lib/api';
import { Quote } from '@/types';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    try {
      const data = await apiService.getQuotes();
      setQuotes(data);
    } catch (error) {
      console.error('Erreur lors du chargement des devis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuoteCreated = (newQuote: Quote) => {
    setQuotes(prev => [newQuote, ...prev]);
    setIsCreateDialogOpen(false);
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.quoteNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.client?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quote.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'sent').length,
    accepted: quotes.filter(q => q.status === 'accepted').length,
    expired: quotes.filter(q => q.status === 'expired').length,
    draft: quotes.filter(q => q.status === 'draft').length,
    totalValue: quotes.reduce((sum, q) => sum + (q.total || 0), 0),
    monthlyValue: quotes
      .filter(q => {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return new Date(q.createdAt) > monthAgo;
      })
      .reduce((sum, q) => sum + (q.total || 0), 0)
  };

  const quickActions = [
    {
      title: 'Nouveau devis',
      description: 'Créer un nouveau devis',
      icon: Plus,
      href: '#',
      variant: 'default' as const,
      onClick: () => setIsCreateDialogOpen(true)
    },
    {
      title: 'Importer devis',
      description: 'Importer depuis un fichier',
      icon: Upload,
      href: '#',
      variant: 'secondary' as const
    },
    {
      title: 'Exporter données',
      description: 'Exporter vers Excel/PDF',
      icon: Download,
      href: '#',
      variant: 'outline' as const
    }
  ];

  return (
    <PageWrapper
      title="Gestion des devis"
      description="Créez, gérez et suivez tous vos devis en un seul endroit"
    >
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total devis
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <FileText className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-500">
                    +{stats.monthlyValue > 0 ? Math.round(stats.monthlyValue) : 0} ce mois
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                <a href="/quotes">
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                En attente
              </CardTitle>
              <div className="p-2 rounded-lg bg-orange-500 text-white">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs text-muted-foreground">En attente de réponse</p>
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
                Acceptés
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.accepted}</p>
                <p className="text-xs text-muted-foreground">Devis acceptés</p>
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
                Valeur totale
              </CardTitle>
              <div className="p-2 rounded-lg bg-gradient-sterenova text-white">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">€{stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Valeur des devis</p>
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
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={action.onClick}
            >
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

      {/* Graphique et statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Évolution des devis</span>
            </CardTitle>
            <CardDescription>
              Performance mensuelle de vos devis
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
              <Calendar className="h-5 w-5 text-green-500" />
              <span>Répartition par statut</span>
            </CardTitle>
            <CardDescription>
              Vue d'ensemble de vos devis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Brouillons</span>
                </div>
                <Badge variant="secondary">{stats.draft}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">En attente</span>
                </div>
                <Badge variant="outline">{stats.pending}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Acceptés</span>
                </div>
                <Badge variant="default">{stats.accepted}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par numéro, client ou description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" /> Filtres
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Exporter
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-sterenova hover:bg-gradient-sterenova/90 text-white">
                <Plus className="h-4 w-4 mr-2" /> Nouveau devis
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer un nouveau devis</DialogTitle>
              </DialogHeader>
              <CreateQuoteForm onSuccess={handleQuoteCreated} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table des devis */}
      <div className="bg-card rounded-lg border">
        <QuotesTable quotes={filteredQuotes} />
      </div>
    </PageWrapper>
  );
}
