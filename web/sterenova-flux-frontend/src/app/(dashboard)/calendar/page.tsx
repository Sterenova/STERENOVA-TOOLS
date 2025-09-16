'use client';

import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  Receipt, 
  Users,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Clock3
} from 'lucide-react';

export default function CalendarPage() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const stats = {
    totalEvents: 12,
    upcomingEvents: 5,
    overdueTasks: 2,
    completedTasks: 8,
    totalQuotes: 24,
    totalInvoices: 18
  };

  const quickActions = [
    {
      title: 'Nouvel événement',
      description: 'Planifier un événement',
      icon: Plus,
      href: '#',
      variant: 'default' as const
    },
    {
      title: 'Nouveau devis',
      description: 'Créer un devis',
      icon: FileText,
      href: '/quotes/new',
      variant: 'secondary' as const
    },
    {
      title: 'Nouvelle facture',
      description: 'Créer une facture',
      icon: Receipt,
      href: '/invoices/new',
      variant: 'outline' as const
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Rendez-vous client - Entreprise ABC',
      date: '2025-09-15',
      time: '14:00',
      type: 'meeting',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Échéance devis DEV-202509-010',
      date: '2025-09-18',
      time: '23:59',
      type: 'quote',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Relance facture FAC-202509-005',
      date: '2025-09-20',
      time: '09:00',
      type: 'invoice',
      status: 'upcoming'
    }
  ];

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'quote': return FileText;
      case 'invoice': return Receipt;
      default: return CalendarIcon;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'quote': return 'bg-orange-500';
      case 'invoice': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting': return 'Rendez-vous';
      case 'quote': return 'Devis';
      case 'invoice': return 'Facture';
      default: return 'Événement';
    }
  };

  return (
    <PageWrapper
      title="Calendrier et planification"
      description="Gérez votre planning et suivez vos échéances importantes"
    >
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total événements
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500 text-white">
                <CalendarIcon className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
                <p className="text-xs text-muted-foreground">Ce mois</p>
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
                Événements à venir
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                <p className="text-xs text-muted-foreground">Cette semaine</p>
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
                Tâches en retard
              </CardTitle>
              <div className="p-2 rounded-lg bg-red-500 text-white">
                <AlertCircle className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.overdueTasks}</p>
                <p className="text-xs text-muted-foreground">À traiter</p>
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
                Tâches terminées
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500 text-white">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stats.completedTasks}</p>
                <p className="text-xs text-muted-foreground">Ce mois</p>
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

      {/* Calendrier et événements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Calendrier principal */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
                <span>Calendrier</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              Vue mensuelle de vos événements et échéances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Calendrier en cours de développement</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Intégration avec une bibliothèque de calendrier prévue
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Événements à venir */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock3 className="h-5 w-5 text-orange-500" />
              <span>Événements à venir</span>
            </CardTitle>
            <CardDescription>
              Vos prochains rendez-vous et échéances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const Icon = getEventTypeIcon(event.type);
                return (
                  <div key={event.id} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{event.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {getEventTypeLabel(event.type)}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vue d'ensemble et rappels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <span>Devis en cours</span>
            </CardTitle>
            <CardDescription>
              Devis nécessitant une action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                  <span className="font-medium">DEV-202509-010</span>
                </div>
                <Badge variant="outline">Expire dans 3 jours</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">DEV-202509-011</span>
                </div>
                <Badge variant="secondary">En attente</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-green-500" />
              <span>Factures à relancer</span>
            </CardTitle>
            <CardDescription>
              Factures nécessitant un suivi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium">FAC-202509-005</span>
                </div>
                <Badge variant="destructive">En retard</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">FAC-202509-006</span>
                </div>
                <Badge variant="outline">À relancer</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section des rappels */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Rappels et notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-700">Rappels automatiques</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configurez des rappels automatiques pour vos échéances importantes : 
                    devis, factures, rendez-vous clients.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-green-700">Suivi des tâches</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Suivez l'avancement de vos tâches et marquez-les comme terminées 
                    pour maintenir un planning efficace.
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
