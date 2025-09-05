import { Metadata, Viewport } from "next";
import "./global.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Squirrel Fund",
  description: "Manage your finances with Squirrel Fund",
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A84FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A84FF" },
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "120x120" },
      { url: "/apple-touch-icon.png", sizes: "152x152" },
      { url: "/apple-touch-icon.png", sizes: "167x167" },
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Squirrel Fund",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* iOS/Apple specific meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Squirrel Fund" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />

        {/* Viewport tuned for iPhone 11 / iPad Air M2 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />

        {/* Apple touch icons */}
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Splash screens (placeholders referencing existing asset) */}
        <link
          rel="apple-touch-startup-image"
          href="/apple-touch-icon.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/apple-touch-icon.png"
          media="(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2)"
        />

        {/* PWA meta */}
        <meta name="theme-color" content="#0A84FF" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />

        {/* Preconnect / DNS prefetch */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* iOS Smart App Banner (configure your App Store id when available) */}
        <meta name="apple-itunes-app" content="app-id=" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
