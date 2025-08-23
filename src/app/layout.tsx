import { Metadata, Viewport } from "next";
import "./global.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Squirrel Fund",
  description: "Manage your finances with Squirrel Fund",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Squirrel Fund",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1565c0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
