import { Metadata } from 'next';
import ClientThemeProvider from '@/components/ClientThemeProvider';

export const metadata: Metadata = {
  title: 'Squirrel Fund',
  description: 'Manage your finances with Squirrel Fund',
  manifest: '/manifest.json',
  themeColor: '#1565c0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Squirrel Fund',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Squirrel Fund" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ClientThemeProvider>
          {children}
        </ClientThemeProvider>
      </body>
    </html>
  );
}
