'use client';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClerkProvider, useAuth, SignedIn, SignedOut } from '@clerk/nextjs';
import './global.css';
import Login2 from './authentication/login/page';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexReactClient } from 'convex/react';

// export const metadata: Metadata = {
//   title: 'Squirrel Fund',
//   description: 'Manage your finances with Squirrel Fund',
//   manifest: '/manifest.json',
//   themeColor: '#1565c0',
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: 'default',
//     title: 'Squirrel Fund',
//   },
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1,
//   },
// };

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Squirrel Fund</title>
        <meta name="description" content="Manage your finances with Squirrel Fund"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        
        <meta name="apple-mobile-web-app-title" content="Squirrel Fund" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <link rel="icon" href="/favicon.ico" type="image/ico" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          type="image/png"
        />
        <link rel="manifest" href="/manifest.json"/>
        
      </head>
      <body>
        <ClerkProvider
          publishableKey={process.env.CLERK_PUBLISHABLE_KEY!}
          appearance={{
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
          }}
        >
          <ClientThemeProvider>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
              {children}
            </ConvexProviderWithClerk>
            <SpeedInsights />
          </ClientThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
