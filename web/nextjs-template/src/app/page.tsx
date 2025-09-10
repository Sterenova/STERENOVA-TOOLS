'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  const { data: serviceInfo, isLoading: serviceLoading, refetch: refetchService } = useQuery({
    queryKey: ['serviceInfo'],
    queryFn: apiService.getServiceInfo,
  });

  const { data: helloData, isLoading: helloLoading, refetch: refetchHello } = useQuery({
    queryKey: ['hello'],
    queryFn: apiService.getHello,
    enabled: isAuthenticated,
  });

  const handleRefresh = () => {
    refetchService();
    refetchHello();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to the Microfrontend Template
        </h1>
        <p className="text-muted-foreground">
          A modern Next.js application with TypeScript, Tailwind CSS, and shadcn/ui
        </p>
      </div>

      {/* User Info */}
      {isAuthenticated && user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>User Information</span>
              <Badge variant="secondary">Authenticated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-lg">{user.preferred_username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Roles</p>
                <div className="flex space-x-2">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Info */}
      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
        </CardHeader>
        <CardContent>
          {serviceLoading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading service information...</span>
            </div>
          ) : serviceInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Service</p>
                <p className="text-lg">{serviceInfo.service}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Version</p>
                <p className="text-lg">{serviceInfo.version}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Environment</p>
                <Badge variant="outline">{serviceInfo.environment}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-lg">{new Date(serviceInfo.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-destructive">
              <XCircle className="h-4 w-4" />
              <span>Failed to load service information</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Protected Data */}
      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Protected Data</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {helloLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading protected data...</span>
              </div>
            ) : helloData ? (
              <div className="space-y-4">
                <p className="text-lg font-medium">{helloData.message}</p>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
                    {JSON.stringify(helloData.user, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-destructive">
                <XCircle className="h-4 w-4" />
                <span>Failed to load protected data</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
    </div>
  );
}