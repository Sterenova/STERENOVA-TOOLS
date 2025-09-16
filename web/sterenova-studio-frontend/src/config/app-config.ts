// Configuration service that detects the environment
export interface AppConfig {
  keycloakUrl: string;
  apiUrl: string;
  appUrl: string;
  isViaGateway: boolean;
}

export function getAppConfig(): AppConfig {
  // During build time, use environment variables
  if (typeof window === 'undefined') {
    return {
      keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
      isViaGateway: false,
    };
  }

  // Check if we're running via Kong Gateway
  const isViaGateway = window.location.hostname === 'localhost' && window.location.port === '8000';

  if (isViaGateway) {
    // Running via Kong Gateway
    return {
      keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/studio',
      appUrl: window.location.origin,
      isViaGateway: true,
    };
  } else {
    // Running directly
    return {
      keycloakUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      appUrl: window.location.origin,
      isViaGateway: false,
    };
  }
}

// Get the correct API base URL
export function getApiBaseUrl(): string {
  const config = getAppConfig();
  return config.apiUrl;
}

// Get the correct Keycloak URL
export function getKeycloakUrl(): string {
  const config = getAppConfig();
  return config.keycloakUrl;
}

// Get the correct app URL for redirects
export function getAppUrl(): string {
  const config = getAppConfig();
  return config.appUrl;
}
