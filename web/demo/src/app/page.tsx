'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LogIn, User } from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated, login } = useAuth();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Next.js Template
        </h1>
        <p className="text-muted-foreground">
          A modern Next.js application with TypeScript, Tailwind CSS, shadcn/ui and Keycloak authentication
        </p>
      </div>

      {/* Authentication Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Authentication Status</span>
            {isAuthenticated ? (
              <Badge variant="default">Authenticated</Badge>
            ) : (
              <Badge variant="secondary">Not Authenticated</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAuthenticated && user ? (
            <div className="space-y-4">
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
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Please log in to access protected features
              </p>
              <Button onClick={login} className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Services Info */}
      <Card>
        <CardHeader>
          <CardTitle>API Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              This template includes a complete API service layer with:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Axios client with automatic token injection</li>
              <li>• Request/response interceptors</li>
              <li>• Error handling and token refresh</li>
              <li>• TypeScript support</li>
              <li>• Ready-to-use service functions</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Check <code className="bg-muted px-2 py-1 rounded">src/services/api.ts</code> for implementation details.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}