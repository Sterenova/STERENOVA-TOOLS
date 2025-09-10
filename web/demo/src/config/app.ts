export const APP_CONFIG = {
  name: 'Microfrontend Template',
  description: 'A modern microfrontend template built with Next.js, TypeScript, and shadcn/ui',
  version: '1.0.0',
  author: 'Platform Team',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  keycloak: {
    url: process.env.NEXT_PUBLIC_KC_URL || 'http://localhost:8080',
    realm: 'platform',
    clientId: 'frontend-app',
  },
} as const;