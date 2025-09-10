# Next.js Microfrontend Template

A modern, production-ready microfrontend template built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Keycloak authentication.

## Features

- 🚀 **Next.js 14** with App Router
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 🧩 **shadcn/ui** components
- 🔐 **Keycloak** authentication
- 📱 **Responsive** design
- 🌙 **Dark/Light** theme support
- 🔄 **React Query** for data fetching
- 📊 **Modern UI** with sidebar navigation

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   ```env
   NEXT_PUBLIC_KC_URL=http://localhost:8080
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin page (requires admin role)
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   │   ├── ModernHeader.tsx
│   │   ├── ModernSidebar.tsx
│   │   └── PageWrapper.tsx
│   ├── providers/         # Context providers
│   │   └── QueryProvider.tsx
│   └── ui/                # shadcn/ui components
├── config/                # Configuration files
│   └── app.ts
├── contexts/              # React contexts
│   └── AuthContext.tsx
├── services/              # API services
│   ├── api.ts
│   └── keycloak.ts
└── lib/                   # Utility functions
    └── utils.ts
```

## Authentication

This template uses Keycloak for authentication. The authentication flow includes:

- **PKCE** (Proof Key for Code Exchange) for secure authentication
- **JWT** token management
- **Role-based** access control
- **Automatic** token refresh
- **Logout** functionality

### Keycloak Configuration

Make sure your Keycloak instance is configured with:

- **Realm**: `platform`
- **Client**: `frontend-app`
- **Client Type**: `public`
- **Standard Flow**: `enabled`
- **Direct Access Grants**: `disabled`
- **PKCE**: `enabled`

## API Integration

The template includes a pre-configured API client with:

- **Axios** for HTTP requests
- **Automatic** token injection
- **Error** handling
- **Request/Response** interceptors

Example usage:
```typescript
import { apiService } from '@/services/api';

// Get service information
const serviceInfo = await apiService.getServiceInfo();

// Get user data
const userData = await apiService.getHello();
```

## Styling

The template uses:

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for pre-built components
- **CSS Variables** for theming
- **Responsive** design patterns

### Adding New Components

Use the shadcn/ui CLI to add new components:

```bash
npx shadcn-ui@latest add [component-name]
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Code Quality

The template includes:

- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** for code formatting
- **Husky** for git hooks

## Deployment

### Docker

Build the Docker image:

```bash
docker build -t nextjs-template .
```

Run the container:

```bash
docker run -p 3000:3000 nextjs-template
```

### Environment Variables

Required environment variables:

- `NEXT_PUBLIC_KC_URL` - Keycloak server URL
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_APP_URL` - Frontend application URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This template is licensed under the MIT License.