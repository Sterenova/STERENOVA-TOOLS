'use client';

import { useEffect, useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Users, 
  Building, 
  User,
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Calendar,
  BarChart3,
  Mail,
  Phone
} from 'lucide-react';
import { apiService } from '@/lib/api';
import { Client } from '@/types';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await apiService.getClients();
      setClients(data);
    } catch (error) {
      console.error('Erreur lors du chargement des clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (client.email && client.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (client.companyName && client.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const stats = {
    total: clients.length,
    individual: clients.filter(c => c.type === 'individual').length,
    company: clients.filter(c => c.type === 'company').length,
    active: clients.filter(c => c.isActive).length,
    totalValue: 0, // À calculer depuis le backend
    monthlyValue: 0 // À calculer depuis le backend
  };

  const quickActions = [
    {
      title: 'Nouveau client',
      description: 'Ajouter un nouveau client',
      icon: Plus,
      href: '/clients/new',
      variant: 'default' as const
    },
    {
      title: 'Importer clients',
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

  const getClientTypeIcon = (type: string) => {
    return type === 'company' ? Building : User;
  };

  const getClientTypeLabel = (type: string) => {
    return type === 'company' ? 'Entreprise' : 'Particulier';
  };

  const getClientTypeColor = (type: string) => {
    return type === 'company' ? 'bg-blue-500' : 'bg-purple-500';
  };

  return (
    <PageWrapper
      title="Gestion des clients"
      description="Gérez votre base de données clients et suivez vos relations commerciales"
    >
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total clients
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <Users className="h-4 w-4" />
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
                <a href="/clients">
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
                Particuliers
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500 text-white">
                <User className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.individual}</p>
                <p className="text-xs text-muted-foreground">Clients particuliers</p>
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
                Entreprises
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <Building className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.company}</p>
                <p className="text-xs text-muted-foreground">Clients entreprises</p>
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
                <p className="text-2xl font-bold">€{stats.totalValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total des clients</p>
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

      {/* Graphique et statistiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <span>Répartition des clients</span>
            </CardTitle>
            <CardDescription>
              Répartition par type de client
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
              <span>Clients récents</span>
            </CardTitle>
            <CardDescription>
              Vos derniers clients ajoutés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.slice(0, 3).map((client) => {
                const Icon = getClientTypeIcon(client.type);
                return (
                  <div key={client.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getClientTypeColor(client.type)} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{getClientTypeLabel(client.type)}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{client.email}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, email ou entreprise..."
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
          <Button className="bg-gradient-sterenova hover:bg-gradient-sterenova/90 text-white">
            <Plus className="h-4 w-4 mr-2" /> Nouveau client
          </Button>
        </div>
      </div>

      {/* Grille des clients */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))
        ) : filteredClients.length === 0 ? (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Aucun client trouvé</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          filteredClients.map((client) => {
            const Icon = getClientTypeIcon(client.type);
            return (
              <Card key={client.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getClientTypeColor(client.type)} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getClientTypeLabel(client.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{client.email}</span>
                    </div>
                    {client.phone && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.companyName && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Entreprise:</span> {client.companyName}
                      </div>
                    )}
                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">CA total</span>
                        <span className="font-semibold">€0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 space-x-2">
                    <Button variant="ghost" size="sm">Voir</Button>
                    <Button variant="ghost" size="sm">Modifier</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </PageWrapper>
  );
}
