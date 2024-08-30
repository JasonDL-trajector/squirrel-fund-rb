import { Metadata } from 'next';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link
          rel="icon"
          href="/favicon.ico"
          type="image/ico"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
        />

        <meta name="apple-mobile-web-app-title" content="Squirrel Fund" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <ClientThemeProvider>
          {children}
          <SpeedInsights />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
