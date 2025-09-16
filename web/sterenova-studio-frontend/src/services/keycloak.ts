import Keycloak, { KeycloakInstance, KeycloakConfig } from 'keycloak-js';
import { getKeycloakUrl, getAppUrl } from '@/config/app-config';

// Only create config on client side
let keycloakConfig: KeycloakConfig | null = null;

if (typeof window !== 'undefined') {
  keycloakConfig = {
    url: getKeycloakUrl(),
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'platform',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'frontend-app',
  };
}

// Only initialize Keycloak on the client side
let keycloak: KeycloakInstance | null = null;

if (typeof window !== 'undefined' && keycloakConfig) {
  keycloak = new Keycloak(keycloakConfig);
}

export interface AuthState {
  isAuthenticated: boolean;
  token?: string | undefined;
  user?: {
    sub: string;
    preferred_username: string;
    email: string;
    roles: string[];
  };
}

export async function initAuth(): Promise<AuthState> {
  if (!keycloak) {
    return { isAuthenticated: false };
  }

  // Vérifier si nous sommes sur la page d'accueil (pas d'authentification requise)
  const isLandingPage = typeof window !== 'undefined' && 
    (window.location.pathname === '/' || window.location.pathname === '/flux' || window.location.pathname === '/studio');

  // Vérifier si Keycloak est déjà initialisé
  if (keycloak.authenticated !== undefined) {
    if (keycloak.authenticated) {
      return {
        isAuthenticated: true,
        token: keycloak.token,
        user: {
          sub: keycloak.subject || '',
          preferred_username: keycloak.tokenParsed?.preferred_username || '',
          email: keycloak.tokenParsed?.email || '',
          roles: keycloak.tokenParsed?.realm_access?.roles || [],
        },
      };
    } else {
      return { isAuthenticated: false };
    }
  }

  try {
    const authenticated = await keycloak.init({
      onLoad: isLandingPage ? 'check-sso' : 'login-required',
      pkceMethod: 'S256',
      checkLoginIframe: false,
    });

    if (authenticated) {
      return {
        isAuthenticated: true,
        token: keycloak.token,
        user: {
          sub: keycloak.subject || '',
          preferred_username: keycloak.tokenParsed?.preferred_username || '',
          email: keycloak.tokenParsed?.email || '',
          roles: keycloak.tokenParsed?.realm_access?.roles || [],
        },
      };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error('Keycloak initialization failed:', error);
    return { isAuthenticated: false };
  }
}

export function getToken(): string | undefined {
  return keycloak?.token;
}

export function getRefreshToken(): string | undefined {
  return keycloak?.refreshToken;
}

export async function refreshToken(): Promise<boolean> {
  if (!keycloak) {
    return false;
  }

  try {
    return await keycloak.updateToken(30);
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
}

export function logout(): void {
  if (!keycloak) {
    return;
  }

  keycloak.logout({
    redirectUri: getAppUrl(),
  });
}

export function login(): void {
  if (!keycloak) {
    return;
  }

  keycloak.login({
    redirectUri: getAppUrl(),
  });
}

export function hasRole(role: string): boolean {
  return keycloak?.hasRealmRole(role) || false;
}

export function hasAnyRole(roles: string[]): boolean {
  return roles.some(role => keycloak?.hasRealmRole(role) || false);
}

// Setup token refresh
if (typeof window !== 'undefined' && keycloak?.authenticated) {
  setInterval(() => {
    keycloak?.updateToken(30).catch(() => {
      console.error('Failed to refresh token');
    });
  }, 30000); // Refresh every 30 seconds
}