import { Metadata } from 'next';
import { baselightTheme } from '@/utils/theme/DefaultColors';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

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
// }

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
      </head>
      <body>
      <ThemeProvider theme={baselightTheme}>
      <CssBaseline />
         
            {children}
          
      </ThemeProvider>
      
      </body>
    </html>
  );
}
