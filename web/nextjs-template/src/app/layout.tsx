import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Providers } from '@/components/providers/QueryProvider';
import { PageWrapper } from '@/components/layout/PageWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Microfrontend Template',
  description: 'Next.js microfrontend template with TypeScript, Tailwind CSS, shadcn/ui and Keycloak authentication',
  keywords: ['microfrontend', 'nextjs', 'react', 'typescript', 'tailwind', 'shadcn', 'keycloak'],
  authors: [{ name: 'Platform Team' }],
  creator: 'Platform Team',
  publisher: 'Platform Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Microfrontend Template',
    description: 'Next.js microfrontend template with TypeScript, Tailwind CSS, shadcn/ui and Keycloak authentication',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: 'Microfrontend Template',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Microfrontend Template',
    description: 'Next.js microfrontend template with TypeScript, Tailwind CSS, shadcn/ui and Keycloak authentication',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <PageWrapper>
              {children}
            </PageWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
